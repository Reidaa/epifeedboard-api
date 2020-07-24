import {UserGetPayload} from "@prisma/client";

export type User = UserGetPayload<{}>


declare global {
    namespace Express {
        export interface Request {
            token: any;
            user: User;
        }
    }
}

export enum Code {
    OK = 200,
    CREATED,
    ACCEPTED,
    NO_CONTENT = 204,

    BAD_REQUEST = 400,
    UNAUTHORIZED,
    FORBIDDEN = 403,
    NOT_FOUND,
    METHOD_NOT_ALLOWED,
    NOT_ACCEPTABLE,
    CONFLICT = 409,

    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED,
    SERVICE_UNAVAILABLE = 503,
}

export const Error = {
    "errors": [
        {
            "domain": "",
            "reason": "",
            "message": " ",
            "locationType": "",
            "location": ""
        }
    ],
    "code": 0,
    "message": ""
};
