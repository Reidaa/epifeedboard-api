import {ResponseError} from "../types";
import {Response} from "express";


export function ManageErrorMessage(
    domain = "global",
    reason = "required",
    message = "something Required",
    locationType = "header",
    location = "somewhere",
    code = 400,
    explicitMessage = "error"): ResponseError { 

    const error: ResponseError = {
        errors: [
            {
                domain,
                reason,
                message,
                locationType,
                location
            }
        ],
        code,
        message: explicitMessage
    };

    return error;
}

export function sendError({res, err}: {res: Response, err: ResponseError}): Response {
    return res.status(err.code).json({err});
}