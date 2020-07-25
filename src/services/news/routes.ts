import {Router} from "express";

import {getNews, search} from "./middlewares";
import {userAuthMiddleware} from "../auth/middlewares";

const router = Router();

router.get("/news/headlines", [getNews]);
// router.get("/news/personal", [...userAuthMiddleware,]);
router.get("/news/search", [search]);

export default router;
