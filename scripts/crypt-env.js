const crypto = require("crypto");
const prompt = require("prompt");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { Transform } = require("stream");

let key = process.argv[3];
const algorithm = "AES-256-CBC";
const encryptedExt = ".enc";
const mode = process.argv[2];

const files = [".env", "prisma/.env"];

function getEnv() {
	if (process.argv.indexOf("--discover") >= 0) {
		return files;
	}
	return files;
}

if (!key) {
	prompt.start();
	prompt.get(["key"], function (err, result) {
		const inputedkey = result.key;
		if (err) {
			return onErr(err);
		}
		crypter({mode, key: inputedkey});
	});
} else {
	crypter({mode, key: key});
}


function crypter({mode, key}) {
	if (!mode)
		throw new Error("missing cryption mode");
	if (!key)
		throw new Error("missing decryption key");
	
	if (mode === "--decrypt") {
		checkforFiles({files: getEnv().map(i => i + encryptedExt)});
		for (const file of files) {
			decrypt({ file, key });
		}
	} else if (mode === "--encrypt") {
		checkforFiles({files: getEnv()});
		for (const file of files) {
			encrypt({ file, key });
		}
	}
}

function checkforFiles({ files }) {
	for (const file of files) {
		if (!fs.existsSync(file)) {
			console.error(`${file} not found`);
			process.exit(1);
		}
	}
	console.log("files found");
}

function onErr(err) {
	console.log(err);
	return 1;
}

function decrypt({ file, key }) {
	if (!file)
		throw Error("missing file");
	if (!key)
		throw new Error("missing key");
	const readPath = path.join(file + encryptedExt);

	// First, get the initialization vector from the file.
	const readInitVect = fs.createReadStream(readPath, { end: 15 });

	let initVect;
	readInitVect.on("data", (chunk) => {
		initVect = chunk;
	});

	// Once we've got the initialization vector, we can decrypt the file.
	readInitVect.on("close", () => {
		const CIPHER_KEY = getCipherKey(key);

		const readStream = fs.createReadStream(readPath, { start: 16 });
		const decipher = crypto.createDecipheriv(algorithm, CIPHER_KEY, initVect);
		const unzip = zlib.createUnzip();
		const writeStream = fs.createWriteStream(path.join(file));

		writeStream.on("close", () => {
			console.log("Decryption success!");
		});

		readStream
			.pipe(decipher)
			.pipe(unzip)
			.pipe(writeStream);
	});
}

function encrypt({ file, key }) {
	if (!file)
		throw Error("missing file");
	if (!key)
		throw new Error("missing key");
	// Generate a secure, pseudo random initilization vector.
	const initVect = crypto.randomBytes(16);

	// Generate a cipher key from the key.
	const CIPHER_KEY = getCipherKey(key);

	const readStream = fs.createReadStream(file);
	const gzip = zlib.createGzip();
	const cipher = crypto.createCipheriv(algorithm, CIPHER_KEY, initVect);
	const appendInitVect = new AppendInitVect(initVect);
	const writeStream = fs.createWriteStream(path.join(file + encryptedExt));

	writeStream.on("close", () => {
		console.log(` ${file}: Encryption success!`);
	});

	readStream
		.pipe(gzip)
		.pipe(cipher)
		.pipe(appendInitVect)
		.pipe(writeStream);
}

function getCipherKey(key) {
	try {
		return crypto.createHash("sha256").update(key).digest();
	} catch (error) {
		console.error(`data: ${key}`);
		throw error;
	}
}

class AppendInitVect extends Transform {
	constructor(initVect, opts) {
		super(opts);
		this.initVect = initVect;
		this.appended = false;
	}

	_transform(chunk, encoding, cb) {
		if (!this.appended) {
			this.push(this.initVect);
			this.appended = true;
		}
		this.push(chunk);
		cb();
	}
}
