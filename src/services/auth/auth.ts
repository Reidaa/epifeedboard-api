import * as jwt from "jsonwebtoken";
import {User} from "@prisma/client";

const jwtKey = process.env["JWT_KEY"];

export function generateAuthToken(user: User): string {
    if (!jwtKey)
        throw new Error("No Key found");
    return jwt.sign({id: user.id}, jwtKey);
}
