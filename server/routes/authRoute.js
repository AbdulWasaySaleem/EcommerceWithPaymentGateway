import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getSummaryController,
} from "../controllers/authController.js";
import {
  isAdmin,
  isNotDemoAdmin,
  requireSignIn,
} from "../middlewares/authMiddlewasare.js";

//router Obj
const router = express.Router();

//@POST || Register user
router.post("/register", registerController);

//@POST || Login user
router.post("/login", loginController);

//@POST || Forgot password
router.post("/forgot-password", forgotController);

//routing Login FOR ADMIN
router.get("/text", requireSignIn, isAdmin, testController);

//User protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Admin protected route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//@GET || Get user orders
router.get("/orders", requireSignIn, getOrdersController);
//@GET || Get all orders for admin
router.get("/allorders", requireSignIn, isAdmin, getAllOrdersController);
//@PUT || Update order status
router.put(
  "/orderstatus/:orderId",
  requireSignIn,
  isAdmin,
  isNotDemoAdmin,
  orderStatusController
);

router.get("/summary-orders", requireSignIn, isAdmin, getSummaryController);

export default router;

//requireSignIn
