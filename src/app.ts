import express, {NextFunction, Request, Response} from "express";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import "./utils/secrets";

import usersRouter from "./services/user/routes";
import authRouter from "./services/auth/routes";
import newsAPIRouter from "./services/News/routes";
import favCategoriesAPIRouter from "./services/favCategories/routes";
import favSourcesAPIRouter from "./services/favSource/routes";
import logger from "./utils/logger";
import {Code} from "./types";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    return next();
});

app.get("/", (_req, res) => {
    return res.status(Code.OK).json({"message": "Bonjour"});
});

app.use("/", usersRouter);
app.use("/", authRouter);
app.use("/", newsAPIRouter);
app.use("/", favCategoriesAPIRouter);
app.use("/", favSourcesAPIRouter);

export default app;
