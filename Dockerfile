FROM node

WORKDIR /app

COPY package.json .
COPY ./prisma/ ./prisma/
COPY tsconfig.json .

RUN npm install --silent

COPY . .

RUN node scripts/crypt-env.js --decrypt flipboard

COPY . .

RUN npx prisma introspect
RUN npx prisma generate

RUN npm run build

COPY . .

EXPOSE 3000

RUN npm start