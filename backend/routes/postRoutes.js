import express from "express"
import { create, showAll } from "../controllers/postController.js";
import imageStoreMiddleware from "../middlewares/imageStoreMiddleware.js";

const postRouter = express.Router();

postRouter.get('/',showAll)
postRouter.post('/create',imageStoreMiddleware.single('featureImage'),create)

export default postRouter