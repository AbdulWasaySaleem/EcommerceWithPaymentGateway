import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewasare.js";
import {
  braintreeController,
  braintreePaymentController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductWithSimilar,
  productCountController,
  productFilterController,
  productListController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import upload from "../middlewares/uploadFile.js";
const router = express.Router();

//create product || POST
router.post(
  "/createproduct",
  requireSignIn,
  isAdmin,
  upload.single("photo"),
  createProductController
);

//Get product || get
router.get("/getproduct", getProductController);

//Router.Delete || DELETE
router.delete("/delete/:pid", deleteProductController);

//create product || POST
router.put(
  "/editproduct/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//fiter product || Post
router.post("/productfilter", productFilterController);

// product count || get
router.get("/productcount", productCountController);

// product per page  || get
router.get("/productlist/:page", productListController);

router.get("/product-and-similar/:slug", getSingleProductWithSimilar);

//Payrment route || token
router.get("/braintree/token", braintreeController);

//payment route
router.post("/braintree/payment",requireSignIn ,braintreePaymentController);

export default router;
