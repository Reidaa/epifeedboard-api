import {Router} from "express";

import {getUser, login, register, setLanguage} from "./middlewares";
import {userAuthMiddleware} from "../../auth/middlewares";

const router = Router();

router.get("/user", [getUser]);
router.put("/user/language", [...userAuthMiddleware, setLanguage]);
router.post("/register", [register]);
router.post("/login", [login]);

export default router;
