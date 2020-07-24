import {Request, Response, Router} from "express";

import {authenticateToken, extractToken} from "./middlewares";
import logger from "../../utils/logger";

const router = Router();

/**
 * route to extract token and authenticate
 */

router.get("/protected",
    extractToken,
    authenticateToken,
    async (req: Request, res: Response) => {
        const {user} = req;
        logger.debug(`Protected: user: ${user.username}`);
        res.send({"message": "OK"});
    }
);

export default router;
