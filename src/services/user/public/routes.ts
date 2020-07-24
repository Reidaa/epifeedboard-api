import {Router} from "express";

import {getUser, login, register, setLanguage} from "./middlewares";
import {userAuthMiddleware} from "../../auth/middlewares";

const router = Router();

router.get("/user", [getUser]);
router.post("/register", [register]);
router.post("/login", [login]);
router.put("/language", [...userAuthMiddleware, setLanguage]);

export default router;
