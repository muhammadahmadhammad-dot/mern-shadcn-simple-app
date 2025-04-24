import { uploadImageCloudanary } from "../helper/cloudinaryHelper.js";
import postModel from "../models/postModel.js";
import { postCreateSchema } from "../validations/postValidation.js";

export const showAll = async (req, res) => {
  try {
    const posts = await postModel.find({ status: true });
    if (!posts) {
      return res.status(404).send({ success: false, message: "Not Found." });
    }
    return res
      .status(200)
      .send({ success: true, message: "All Posts.", posts });
  } catch (error) {
    console.log("ShowAll controller error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
export const create = async (req, res) => {
  try {
    const { data, error } = postCreateSchema.safeParse(req.body);
    if (error) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Validation error!",
          validateErrors: error.format(),
        });
    }
    const image = req.file
    const filePath = image.path
    // if (!image) {
    //     return res
    //     .status(400)
    //     .send({
    //       success: false,
    //       message: "Validation error!",
    //       validateImageError:"Image is required",
    //     }); 
    // }

    
        // cloudinary
    const {secure_url, public_id}=await uploadImageCloudanary(filePath,"posts")
    if (!secure_url) {
        return res.status(400).json({ error:secure_url });
    }

    const { title, slug, shortDescription, description, status  } = data;

    const post = await postModel.create({
      title,
      slug,
      shortDescription,
      description,
      status,
      author:req.user.id,
      featureImage : {
        secure_url,
        public_id,
      }
    });

    return res
      .status(201)
      .send({ success: true, message: "Post Created successfully.", post });
  } catch (error) {
    console.log("Create controller error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
