import {Router} from "express";

import publicRouter from "./public/routes";

const router = Router();

router.use("/favCategory", publicRouter);

export default router;
