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
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewasare.js";

//router Obj
const router = express.Router();

//routing Register && Login || POST
router.post("/register", registerController);

router.post("/login", loginController);
//forgotpassword Route || post
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
//Orders
router.get("/orders", requireSignIn, getOrdersController);
//All-Orders
router.get("/allorders", requireSignIn, isAdmin, getAllOrdersController);
//All-Orders-status
router.put(
  "/orderstatus/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

router.get("/summary-orders", requireSignIn,isAdmin, getSummaryController)

export default router;

//requireSignIn
