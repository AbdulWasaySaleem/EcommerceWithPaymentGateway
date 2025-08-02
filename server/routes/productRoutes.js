import express from "express";
import {
  isAdmin,
  isNotDemoAdmin,
  requireSignIn,
} from "../middlewares/authMiddlewasare.js";
import {
  braintreeController,
  braintreePaymentController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProduct,
  getSingleProductWithSimilar,
  productCountController,
  productFilterController,
  productListController,
  updateProductController,
} from "../controllers/productController.js";
import upload from "../middlewares/uploadFile.js";
const router = express.Router();

//@POST || Creating a product
router.post(
  "/createproduct",
  requireSignIn,
  isAdmin,
  upload.single("photo"),
  isNotDemoAdmin,
  createProductController
);
//@DELETE || Delete a product
router.delete(
  "/delete/:pid",
  requireSignIn,
  isAdmin,
  isNotDemoAdmin,
  deleteProductController
);

//@PUT || Update product
router.put(
  "/editproduct/:pid",
  requireSignIn,
  isAdmin,
  upload.single("photo"),
  isNotDemoAdmin,
  updateProductController
);

//@GET || Get all products
router.get("/getproduct", getProductController);

//@POST || Filter products
router.post("/productfilter", productFilterController);

//@GET || Get total product count
router.get("/productcount", productCountController);

//@GET || Get products with pagination
router.get("/productlist/:page", productListController);

//@GET || Get single product with similar products
router.get("/product-and-similar/:slug", getSingleProductWithSimilar);

//@GET || Get single product by slug
router.get("/getproduct/:slug", getSingleProduct);

//@GET || Get Braintree token
router.get("/braintree/token", braintreeController);

//@GPOST || Process Braintree payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
