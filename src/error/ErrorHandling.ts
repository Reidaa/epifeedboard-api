import {Error} from "../types";


export function ManageErrorMessage(
    domain = "global",
    reason = "required",
    message = "something Required",
    locationType = "header",
    location = "somewhere",
    code = 400,
    explicitMessage = "error"): {errors: {domain: string, reason: string, message: string, locationType: string, location: string}[], code: number, message: string} {

    const error = Error;

    error["errors"][0].domain = domain;
    error["errors"][0].reason = reason;
    error["errors"][0].message = message;
    error["errors"][0].locationType = locationType;
    error["errors"][0].location = location;

    error["code"] = code;
    error["message"] = explicitMessage;

    return error;
}
