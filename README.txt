# SwiftBuy 🛒

SwiftBuy is a full-featured modern e-commerce platform built with the **MERN Stack** (MongoDB, Express.js, React, Node.js).

## 🌟 Features

### 👥 User Side
- Browse and filter products
- Add products to cart and place orders
- Track orders status from the user dashboard
- Secure Braintree Payment Gateway integration

### 🛠️ Admin Side
- Add, edit, and delete products and categories
- View and manage all orders
- Update user order status (cancel/pending/delivered)
- Admin dashboard with analytics

## 💻 Tech Stack

- **Frontend:** React, Tailwind CSS, Ant Design, Lucide React (for icons)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Payments:** Braintree
- **Image Uploads:** Cloudinary


### Steps to Run the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbdulWasaySaleem/EcommerceWithPaymentGateway
   cd EcommerceWithPaymentGateway

   ```

2. **Install Backend Dependencies**:
   - Navigate to the backend directory and install the dependencies:
     ```bash
     cd backend
     npm install
     ```

3. **Install Frontend Dependencies**:
   - Navigate to the frontend directory and install the dependencies:
     ```bash
     cd frontend
     npm install
     ```

4. **Setup Environment Variables**:
   - Create an `.env` file in the root of both the `client` and `server` directories and add the following environment variables:

   **Client Environment Variables** (in `client/.env`):
   ```bash
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

   **Server Environment Variables** (in `server/.env`):
   ```bash
   PORT = 8080
   MONGO_URL = your_MongoDb_String
   JWT_SECRET = your_secret

   BRAINTREE_MERCHANT_ID = from_BrainTree_DashBoard
   BRAINTREE_PUBLIC_KEY = from_BrainTree_DashBoard
   BRAINTREE_PRIVATE_KEY = from_BrainTree_DashBoard


   EMAIL_USERNAME=your_email (optional)
   EMAIL_PASSWORD=your_password (optional)
   EMAIL_FOR=email_to_receive_queries (optional)

   CLOUDINARY_NAME= from_Cloudinary_DashBoard
   CLOUDINARY_API_KEY= from_Cloudinary_DashBoard
   CLOUDINARY_API_SECRET= from_Cloudinary_DashBoard

   CLIENT_ORIGIN= your_Client_Origin_URL
   ```

   Make sure to replace everything with your actual credentials.

5. **Run MongoDB**:
   - Make sure MongoDB is running on your local machine or connect it to a cloud instance (like MongoDB Atlas).

6. **Start the Backend**:
   - In the `server` directory, run:
     ```bash
     npm start
     ```

7. **Start the Frontend**:
   - In the `client` directory, run:
     ```bash
     npm run dev
     ```

8. **Access the Application**:
   - Open your browser and access the app at `http://localhost:5173`.


## Contributing
If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. Any suggestions or improvements are always welcome!

## Contact
For any inquiries, please feel free to reach out to 07.abdulwasayy@gmail.com.

---

