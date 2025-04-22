import express from "express"
import { create, showAll } from "../controllers/postController.js";
import imageStoreMiddleware from "../middlewares/imageStoreMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const postRouter = express.Router();

postRouter.get('/',showAll)
postRouter.post('/create',authMiddleware,imageStoreMiddleware.single('featureImage'),create)

export default postRouter