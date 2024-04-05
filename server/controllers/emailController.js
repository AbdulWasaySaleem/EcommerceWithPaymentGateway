// controllers/emailController.js
import nodemailer from "nodemailer";

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "07.abdulwasayy@gmail.com", // Your Gmail email address
    pass: "", // Your Gmail password
  },
});

// Function to send an email
export const sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: "07.abdulwasayy@gmail.com",
      to: "", // Your email address
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    //console.log(`Email sent to ${mailOptions.to}`); // Correctly log the recipient email address

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

