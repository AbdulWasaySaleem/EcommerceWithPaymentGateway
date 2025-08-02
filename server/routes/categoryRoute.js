import express from "express";
import {
  requireSignIn,
  isAdmin,
  isNotDemoAdmin,
} from "../middlewares/authMiddlewasare.js";
import {
  categoryController,
  createCategoryController,
  deletecategory,
  singlecategory,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//@GET || Get all categories
router.get("/allcategory", categoryController);
//@GET || Get single category by slug
router.get("/singlecategory/:slug", singlecategory);

//@POST || Creating a category
router.post(
  "/createcategory",
  requireSignIn,
  isAdmin,
  isNotDemoAdmin,
  createCategoryController
);
//@PATCH || Update category
router.put(
  "/updatecategory/:id",
  requireSignIn,
  isAdmin,
  isNotDemoAdmin,
  updateCategoryController
);

//@DELETE || Delete category
router.delete(
  "/deletecategory/:id",
  requireSignIn,
  isAdmin,
  isNotDemoAdmin,
  deletecategory
);

export default router;
