# 🛍️ E-Commerce – Modern Full Stack E-commerce Website

**E-Commerce** is a fully functional and scalable e-commerce platform built with a modern tech stack. The project includes a responsive React frontend, a Node.js + Express backend, and is designed for easy integration of features like authentication, payments, and admin control and order management.

---

## 🌐 Live Demo

Frontend: [https://quicklet-frontend.onrender.com](https://ecommerce-frontend.onrender.com)  
Backend: [https://quicklet-backend.onrender.com](https://e-commerce-backend.onrender.com)

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🔄 React Router DOM
- 🎯 React Icons
- 📦 Axios

### 🛠️ Backend

- 🟢 Node.js
- 🚀 Express.js
- 🗃️ MongoDB (via Mongoose)
- 🔐 JWT Authentication (future)
- 🧂 bcrypt for password hashing (future)
- 📦 dotenv for environment configuration
- 🧪 CORS, Morgan for logging and API support

---

## 📁 Folder Structure

```
E-Commerce/
├── client/                 # Frontend (React + Vite)
│   ├── public/
│   ├── src/
|   |   ├── assets/         # Images, icons, etc.
│   │   ├── components/     # Reusable components (Navbar, ProductCard, etc.)
│   │   ├── pages/          # Page-level components (Home, Cart, ProductDetail)
│   │   ├── App.jsx         # Main app structure
│   │   └── main.jsx        # App entry point
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Backend (Node + Express)
│   ├── config/             # DB connection, environment setup
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas (Product, User, Order - future)
│   ├── routes/             # Express routes (products, users - planned)
│   ├── middleware/         # Error handling, auth (planned)
│   ├── utils/              # Helper functions (e.g., token generation)
│   ├── server.js           # Entry point
│   └── package.json
│
├── .gitignore
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x
- MongoDB Atlas/local
- Git

---

## ⚙️ Installation & Setup

#### 1 Clone the repo

```bash
https://github.com/Shub17-code/E-commerce.git
```

### 🖥️ Frontend (Client)

```bash
cd frontend
npm install
npm run dev
```

### 🛠️ Backend (Server)

```bash
cd ../backend
npm install
# Create .env file (see below) and set the following:
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in `server/` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_url
JWT_SECRET=your_jwt_secret
```

---

## 🚀 Features

- 🏪 Product listing & detail view
- 🛍️ Browse dynamic products
- 🛒 Add to Cart functionality
- 🎨 Fully responsive UI
- 🧭 Client-side routing with React Router
- 📡 API Integration with Express backend
- 📦 MongoDB schema design for products
- 👤 Future scope: Auth, Payments, Admin dashboard

---

## 🔮 Future Enhancements

- 🧾 User Authentication (JWT, bcrypt)
- 📦 Product CRUD with Admin role
- 💳 Payment Gateway (Razorpay/Stripe)
- 🛍️ Order management system
- 📊 Sales analytics dashboard
- 📦Product filters & search
- 📧 Email Notifications (Nodemailer)

---

### 📦 API Endpoints

> Current endpoints focus on products. Future updates will expand support to users, orders, authentication, and payments.

#### 🛍️ Product Routes

| Method | Endpoint            | Description          | Access     |
| ------ | ------------------- | -------------------- | ---------- |
| GET    | `/api/products`     | Fetch all products   | Public     |
| GET    | `/api/products/:id` | Fetch product by ID  | Public     |
| POST   | `/api/products`     | Add a new product    | Admin Only |
| PUT    | `/api/products/:id` | Update product by ID | Admin Only |
| DELETE | `/api/products/:id` | Delete product by ID | Admin Only |

> These endpoints use MongoDB as the primary data store and are connected using Mongoose models.

#### 🔐 Planned Future Endpoints

- **User Routes:** Signup, Login, Profile, Update Info
- **Order Routes:** Place order, Track order, Cancel
- **Payment Routes:** Integrate with Razorpay/Stripe
- **Cart Routes:** Add to cart, Update cart, Remove item

---

### 🤝 Contributing

We welcome contributions from developers of all experience levels! Help us improve **E-Commerce** by fixing bugs, adding features, or refining the UI/UX.

#### 🔧 How to Contribute

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/E-commerce.git
   make specific changes
   ```
3. **Create** a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make** your changes (frontend, backend)
5. **Commit** and **push**:
   ```bash
   git add .
   git commit -m "Add: your feature"
   git push origin feature/your-feature-name
   ```
6. Open a **Pull** Request (PR) with a clear description

🧰 Contribution Tips

1. Follow existing code styles
2. Test your changes before pushing
3. Link related issues if applicable
4. Keep PRs focused and small

---

## 📃 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developed & Maintained by

**Shubham Choudhary**
• [🐙 GitHub](https://github.com/Shub17-code)

> _"E-Commerce – Your one-stop destination for effortless online shopping."_

```

```
