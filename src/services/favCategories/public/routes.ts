import {Router} from "express";

import {favoriteCategory, getFavoriteCategories, getAllFavoriteCategories} from "./middlewares";
import {userAuthMiddleware} from "../../auth/middlewares";

const router = Router();

router.post("", [...userAuthMiddleware, favoriteCategory]);
router.get("", [...userAuthMiddleware, getFavoriteCategories]);
router.get("/all", [getAllFavoriteCategories]);

export default router;
