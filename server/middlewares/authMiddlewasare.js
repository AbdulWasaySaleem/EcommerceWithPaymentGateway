import JWT from "jsonwebtoken";
import userModel from "../Model/userModel.js";

// Protecting Route (Token Based)
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decode._id).select("-password");
    next();
  } catch (error) {
    console.log("Auth middleware error:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

// Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Middleware error in isAdmin",
    });
  }
};

export const isNotDemoAdmin = (req, res, next) => {
  try {
    if (req.user?.isDemoAdmin) {
      return res.status(403).json({
        success: false,
        message: "Demo Admins are not allowed to modify or add data",
      });
    }
    next();
  } catch (error) {
    console.log("isNotDemoAdmin error:", error);
    res.status(500).json({
      success: false,
      message: "Middleware error",
    });
  }
};