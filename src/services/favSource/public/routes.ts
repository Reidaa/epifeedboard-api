import {Router} from "express";

import {favoriteSource, getAllFavoriteSources, getFavoriteSources} from "./middlewares";
import {userAuthMiddleware} from "../../auth/middlewares";

const router = Router();

router.post("", [...userAuthMiddleware, favoriteSource]);
router.get("", [...userAuthMiddleware, getFavoriteSources]);
router.get("/all", [getAllFavoriteSources]);

export default router;
