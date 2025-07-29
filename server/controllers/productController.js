import productModel from "../Model/productModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import orderModel from "../Model/orderModel.js";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";

dotenv.config();
//Payment Gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.body;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ message: "Name is required" });
      case !description:
        return res.status(400).send({ message: "Description is required" });
      case !price:
        return res.status(400).send({ message: "Price is required" });
      case !quantity:
        return res.status(400).send({ message: "Quantity is required" });
    }

    const slug = req.body.slug || slugify(name);

    // Build product object
    const productData = {
      name,
      description,
      price,
      quantity,
      shipping,
      slug,
      category,
    };

    if (req.file) {
      productData.photo = {
        url: req.file.path, // Cloudinary URL
        public_id: req.file.filename, // Cloudinary public ID
      };
    }

    const product = new productModel(productData);
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully!",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).send({
      success: false,
      message: "Error creating product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products Successfully!",
      products, // ✅ plural for consistency
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error getting products",
      error,
    });
  }
};

//deleteProductController
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);

    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    // Delete image from Cloudinary
    if (product.photo && product.photo.public_id) {
      await cloudinary.uploader.destroy(product.photo.public_id);
    }

    await productModel.findByIdAndDelete(req.params.pid);

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      error,
    });
  }
};

//Update
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, shipping } = req.body;
    const photo = req.file;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ message: "Name is required" });
      case !description:
        return res.status(400).send({ message: "Description is required" });
      case !price:
        return res.status(400).send({ message: "Price is required" });
      case !quantity:
        return res.status(400).send({ message: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ message: "Photo should be less than 1MB" });
    }

    // Generate slug
    const slug = req.body.slug || slugify(name);

    // Update product
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        name,
        description,
        price,
        quantity,
        shipping,
        slug,
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.mimetype;
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully!",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({
      success: false,
      message: "Error with Updating Product",
      error,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    //initializing objetcs || dynamix object
    let args = {};
    //making new object and passing value to checked
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Retrieving Product Count",
      error,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.params.page ? req.params.page : 1;

    const productsData = await productModel
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .populate("category", "name");

    const products = productsData.map((product) => {
      const url = product.photo.url.replace(
        "/upload/",
        "/upload/f_auto,q_auto/"
      );
      return {
        ...product.toObject(), // ✅ fix is here
        photo: {
          ...product.photo,
          url,
        },
      };
    });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Products List",
      error,
    });
  }
};


export const getSingleProductWithSimilar = async (req, res) => {
  try {
    // Step 1: Get the main product
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category", "name");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Step 2: Get similar products using category and excluding the current one
    const similarProducts = await productModel
      .find({
        category: product.category._id,
        _id: { $ne: product._id },
      })
      .select("name slug price description photo.url")
      .limit(4)
      .populate("category", "name");

    // Step 3: Respond with both
    res.status(200).send({
      success: true,
      message: "Product and similar products fetched",
      product,
      similarProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching product and similar products",
      error,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  //update product
  const { slug } = req.params;
  try {
    const product = await productModel
      .findOne({ slug })
      .populate("category", "name");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching single product",
      error,
    });
  }
};

// Payment || token
export const braintreeController = async (req, res) => {
  try {
    // Generate a client token using the Braintree gateway
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        // If there is an error during token generation, send a 500 Internal Server Error response
        res.status(500).send(err);
      } else {
        // If successful, send a JSON response with the generated client token
        res.status(200).json({ clientToken: response.clientToken });
      }
    });
  } catch (error) {
    // Handle any unexpected errors during the try block
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Payment GateWay
export const braintreePaymentController = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { cart, nonce } = req.body;

    // Calculate the total amount from the items in the cart
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });

    // Perform a transaction using the Braintree gateway
    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // If the transaction is successful, create an order in the database
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();

          // Send a JSON response indicating success
          res.json({ ok: true });
        } else {
          // If there is an error in the transaction, send a 500 Internal Server Error response with details of the error
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    // Handle any unexpected errors during the try block
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
