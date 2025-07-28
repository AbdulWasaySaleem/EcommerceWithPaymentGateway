import JWT from "jsonwebtoken";
import userModel from "../Model/userModel.js";

//protecting Route token base
export const requireSignIn = async (req, res, next) => {
 try {
    const token = req.headers.authorization?.replace("Bearer ", "") || req.headers.authorization;
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decode._id).select("-password");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};

//Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "middleware error in isAdmin",
    });
  }
};
