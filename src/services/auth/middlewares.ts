import {NextFunction, Request, Response} from "express";
import {Bearer} from "permit";
import * as jwt from "jsonwebtoken";

import {User} from "../../types";
import {getByID} from "../user/controller";
import logger from "../../utils/logger";

const jwtKey = process.env["JWT_KEY"];
const permit = new Bearer({
    query: "access_token", // Also allow an `?access_token=` query parameter.
});

export function extractToken(req: Request, res: Response, next: NextFunction): void {
    if (!jwtKey)
        throw new Error("No key");
    // Try to find the bearer token in the request.
    const token = permit.check(req);

    // No token found, so ask for authentication.
    if (!token) {
        logger.debug("extractToken: Token is null");
        permit.fail(res);
        return next(new Error("Authentication required!"));
    }
    req.token = token;
    return next();
}

export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const payload = jwt.decode(req.token);

    if (!payload) {
        logger.debug("Authenticate: Payload is null");
        permit.fail(res);
        return next(new Error("Authentication required!"));
    }

    // @ts-ignore
    const id = payload?.id;

    const user: User | null = await getByID(id);
    if (!user) {
        permit.fail(res);
        return next(new Error("Authentication invalid!"));
    }
    req.user = user;
    return next();
}

export const userAuthMiddleware = [extractToken, authenticateToken];
