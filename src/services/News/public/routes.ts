import {Router} from "express";

import {getNews, search} from "./middlewares";
import {userAuthMiddleware} from "../../auth/middlewares";

const router = Router();

router.get("/news", [getNews]);
router.get("/news/me", [...userAuthMiddleware,]);
router.get("/search", [search]);

export default router;
