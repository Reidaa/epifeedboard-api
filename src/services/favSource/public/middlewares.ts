import {Request, Response} from "express";
import {Code} from "../../../types";
import * as favSourceController from "../controller";
import {ManageErrorMessage} from "../../../error/ErrorHandling";


/**
 * This function check the updated status of the source and update it
 * @params :
 *      source (string ex: bbc-news)
 *      status (string ex: like/dislike)
 * @returns 200 if OK
 */


export async function favoriteSource(req: Request, res: Response): Promise<Response> {
    const {user} = req;

    const {source, status} = req.body;

    if (!user) {
        const error = ManageErrorMessage("global",
            "required",
            "login required",
            "header",
            "user",
            Code.BAD_REQUEST,
            "The user was undefined");

        return res.status(Code.BAD_REQUEST).json({error});
    } else if (!source || !status) {

        const error = ManageErrorMessage("global",
            "required",
            "source and status required",
            "parameter",
            "source / status",
            Code.BAD_REQUEST,
            "The source or the status was undefined");

        return res.status(Code.BAD_REQUEST).json({error});
    }

    try {
        if (status == "like") {
            const favoriteCategory = await favSourceController.findOrCreate(source, user.id);
            return res.status(Code.OK).json({favoriteCategory});
        } else if (status == "dislike") {
            const favoriteCategory = await favSourceController.deleteSource(source, user.id);
            return res.status(Code.OK).json({favoriteCategory});
        } else {
            const error = ManageErrorMessage("global",
                "Invalid argument",
                "status invalid",
                "parameter",
                "status",
                Code.BAD_REQUEST,
                "The status was not 'like' or 'dislike'");

            return res.status(Code.BAD_REQUEST).json({error});
        }
    } catch {
        const error = ManageErrorMessage("global",
            "server",
            "internal server error",
            "server",
            "favCategories",
            Code.INTERNAL_SERVER_ERROR,
            "undefined");

        return res.status(Code.INTERNAL_SERVER_ERROR).json({error});
    }
}

/**
 * This function looks for the favorites sources of the user
 * @returns 200 if OK
 */

export async function getFavoriteSources(req: Request, res: Response): Promise<Response> {
    const {user} = req;

    if (user) {
        try {
            const favoriteCategory = await favSourceController.getUserFavoriteSources(user.id);
            return res.status(Code.OK).json({favoriteCategory});

        } catch {
            const error = ManageErrorMessage("global",
                "server",
                "internal server error",
                "server",
                "getFavoriteSources",
                Code.INTERNAL_SERVER_ERROR,
                "undefined");

            return res.status(Code.INTERNAL_SERVER_ERROR).json({error});
        }
    } else {
        const error = ManageErrorMessage("global",
            "server",
            "internal server error",
            "server",
            "getFavoriteSources",
            Code.INTERNAL_SERVER_ERROR,
            "undefined");

        return res.status(Code.INTERNAL_SERVER_ERROR).json({error});
    }

}


/**
 * This function check the updated status of the source and update it
 * @returns 200 if OK
 */


export async function getAllFavoriteSources(req: Request, res: Response): Promise<Response> {

    try {
        const favoriteCategory = await favSourceController.getAllFavoriteSources();
        return res.status(Code.OK).json({favoriteCategory});

    } catch {
        const error = ManageErrorMessage("global",
            "server",
            "internal server error",
            "server",
            "getAllFavoriteSources",
            Code.INTERNAL_SERVER_ERROR,
            "undefined");

        return res.status(Code.INTERNAL_SERVER_ERROR).json({error});
    }
}
