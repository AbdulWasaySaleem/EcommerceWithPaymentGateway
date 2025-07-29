import userModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import orderModel from "../Model/orderModel.js";
import productModel from "../Model/productModel.js";

export const registerController = async (req, res) => {
  try {
    // Destructure user data from request body
    const { name, email, password, phone, address, role, answer } = req.body;

    //validation
    if (!name || !email || !password || !phone || !address || !answer)
      return res.send({
        message: "Please fill all fields",
      });
    // Check if the user with the provided email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User with this email already exists",
      });
    }

    //hashing password
    const hashedpassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedpassword,
      phone,
      address,
      answer,
      role,
    });

    // Save the user to the database
    const saveNewUser = await newUser.save();

    // Return a success message
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      saveNewUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};
//Login || POST
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not register",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //crete token JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully...",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
//forgot password
export const forgotController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      res.status(400).send({ message: "Please fill all the fields..." });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res
        .status(400)
        .send({ success: false, message: "Wrong Email or answer" });
    }
    //hashed
    const hashPass = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(user._id, { password: hashPass });
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Forgot ",
      error,
    });
  }
};
//order
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("buyer", "name")
      .populate({
        path: "products",
        populate: {
          path: "category",
          select: "name", // only get category name
        },
      });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Orders ",
      error,
    });
  }
};
//All order
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("buyer", "name")
      .populate("products");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in All Orders ",
      error,
    });
  }
};

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in All Orders status",
      error,
    });
  }
};

//test
export const testController = (req, res) => {
  return res.send("pritected route ");
};

export const getSummaryController = async (req, res) => {
  try {
    const users = await userModel.countDocuments();
    const orders = await orderModel.countDocuments();
    const products = await productModel.countDocuments();

    res.json({
      users,
      orders,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting summary",
      error,
    });
  }
};
