import {Request, Response} from "express";
import {Code} from "../../../types";
import * as NewsController from "../controller";
import {ManageErrorMessage} from "../../../error/ErrorHandling";


/**
 * This function check the updated status of the category and update it
 * @params :
 *      category (string ex: business)
 *      status (string ex: like/dislike)
 * @returns 200 if OK
 */
export async function favoriteCategory(req: Request, res: Response): Promise<Response> {
    const {user} = req;

    const {category, status} = req.body;


    if (!user) {
        const error = ManageErrorMessage("global",
            "required",
            "login required",
            "header",
            "user",
            Code.BAD_REQUEST,
            "The user was undefined");

        return res.status(Code.BAD_REQUEST).json({error});
    } else if (!category || !status) {
        const error = ManageErrorMessage("global",
            "required",
            "category and status required",
            "parameter",
            "category / status",
            Code.BAD_REQUEST,
            "The category or the status was undefined");

        return res.status(Code.BAD_REQUEST).json({error});
    }

    try {
        if (status === "like") {
            const favoriteCategory = await NewsController.findOrCreate(category, user.id);
            return res.status(Code.OK).json({favoriteCategory});
        } else if (status === "dislike") {
            const favoriteCategory = await NewsController.deleteCategory(category, user.id);
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
 * This function looks for the favorites categories of the user
 * @returns 200 if OK
 */

export async function getFavoriteCategories(req: Request, res: Response): Promise<Response> {
    const {user} = req;

    if (user) {
        try {
            const favoriteCategory = await NewsController.getUserFavoriteCategories(user.id);
            return res.status(Code.OK).json({favoriteCategory});
        } catch {
            const error = ManageErrorMessage("global",
                "server",
                "internal server error",
                "server",
                "getFavoriteCategories",
                Code.INTERNAL_SERVER_ERROR,
                "undefined");

            return res.status(Code.INTERNAL_SERVER_ERROR).json({error});
        }
    } else {
        const error = ManageErrorMessage("global",
            "required",
            "login required",
            "header",
            "favCategories",
            Code.BAD_REQUEST,
            "The user was undefined");

        return res.status(Code.BAD_REQUEST).json({error});
    }

}


/**
 * This function looks for all favorites categories of every user
 * @returns 200 if OK
 */
export async function getAllFavoriteCategories(req: Request, res: Response): Promise<Response> {
    try {
        const favoriteCategory = await NewsController.getAllFavoriteCategories();
        return res.status(Code.OK).json({favoriteCategory});
    } catch {
        const error = ManageErrorMessage("global",
            "server",
            "internal server error",
            "server",
            "getAllFavoriteCategories",
            Code.INTERNAL_SERVER_ERROR,
            "undefined");

        return res.status(Code.INTERNAL_SERVER_ERROR).json({error});
    }
}
