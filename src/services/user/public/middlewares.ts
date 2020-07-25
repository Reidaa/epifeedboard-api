import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {User} from "@prisma/client";

import * as controller from "../controller";
import {create, getByUsername, updateLanguage} from "../controller";
import logger from "../../../utils/logger";
import {Code} from "../../../types";
import {generateAuthToken} from "../../auth/auth";


/**
* This function look for an existing user in the database with the username and id passed
 * @returns 200 if OK
*/
export async function getUser(req: Request, res: Response): Promise<Response> {
    const {username, id} = req.query;
    let user: User | null = null;

    if (!username && !id)
        return res.sendStatus(Code.BAD_REQUEST);
    try {
        if (id) {
            user = await controller.getByID(String(id));
        } else if (username) {
            if (username === "me") {
                user = req.user;
            } else {
                user = await controller.getByUsername(String(username));
            }
        }
        if (!user) {
            return res.sendStatus(Code.NOT_FOUND);
        }
        delete user.password;
        return res.status(Code.OK).json({...user});
    } catch (err) {
        logger.error(err);
        return res.sendStatus(Code.INTERNAL_SERVER_ERROR);
    }
}

/**
 * This function try to login an user with the username and password passed
 * @returns 200 if OK
 */
export async function login(req: Request, res: Response): Promise<Response> {
    const {username, password} = req.body;

    if (!(username && password)) {
        logger.debug("Login: Missing username or password");
        return res.sendStatus(Code.BAD_REQUEST);
    }
    const user = await getByUsername(username);
    if (!user) {
        logger.debug("Login: User not found");
        return res.sendStatus(Code.NOT_FOUND);
    }
    if (!await bcrypt.compare(password, user.password)) {
        logger.debug("Login: Password incorrect");
        return res.sendStatus(Code.UNAUTHORIZED);
    }
    logger.debug("Login: Sending token");
    return res.status(Code.OK).json({"token": generateAuthToken(user)});
}

/**
 * This function try to register an user with an email, an username and a password passed
 * @returns 200 if OK
 */
export async function register(req: Request, res: Response): Promise<Response> {
    const {email, username, password} = req.body;

    if (!(email && username && password))
        return res.sendStatus(Code.BAD_REQUEST);
    const existingUser = await getByUsername(username);
    if (existingUser)
        return res.sendStatus(Code.CONFLICT);
    const newUser = await create(email, username, password);
    return res.status(Code.CREATED).json({token: generateAuthToken(newUser)});
}

export async function setLanguage(req: Request, res: Response): Promise<Response> {
    const {user} = req;
    const {language} = req.query;

    if (!(user || language))
        return res.sendStatus(Code.BAD_REQUEST);
    const updated_user = await updateLanguage(user.id, String(language));
    return res.status(Code.CREATED).json({updated_user});
}
