import {User} from "@prisma/client";


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

export type ResponseError = {
    "errors": [
        {
            "domain": String
            "reason": String,
            "message": String,
            "locationType": String,
            "location": String
        }
    ],
    "code": Code,
    "message": String
};
