import winston from "winston";

const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`,
    )
);

const fileFormat = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`,
    )
);

const testFormat = winston.format.combine(
    // winston.format.label({ label: path.basename(process.mainModule.filename) }),
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    // Format the metadata object
    winston.format.metadata({fillExcept: ["message", "level", "timestamp", "label"]}),
    winston.format.json(),
    winston.format.prettyPrint()
);

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug",
            format: consoleFormat
        }),
        new winston.transports.File({
            dirname: "log",
            filename: "debug.log",
            level: "debug",
            format: fileFormat
        }),
        new winston.transports.File({
            dirname: "log",
            filename: "error.log",
            level: "error",
            format: testFormat
        })
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
