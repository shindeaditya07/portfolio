# 🚀 Dynamic Developer Portfolio & Admin Panel

A high-performance, modern, and 100% dynamic portfolio website built for developers. This project consists of a sleek user-facing portfolio with stunning glassmorphic UI/animations, and a secure backend-driven Admin Panel to manage all content dynamically without touching a single line of code.

---

## ✨ Features

### Frontend (Client)
- **Stunning UI/UX**: Built with React, Tailwind CSS, and Framer Motion for smooth page transitions and micro-animations.
- **100% Config-Driven**: No hardcoded personal text. Everything from your name, social links, and navigation items is controlled via `src/utils/constants.ts`.
- **Dynamic Content Integration**: Real-time fetching of Projects, Experiences, Publications, and Certifications from the MongoDB backend.
- **Graceful Fallbacks**: If the database is empty or the API goes down, the frontend seamlessly falls back to local configuration data so your site never breaks.
- **Integrated Resume Viewer**: A beautiful, animated side-panel to view and download your resume PDF without leaving the site.

### Backend (Server) & Admin Panel
- **Integrated Admin Dashboard**: Accessible via `/admin`. Features a completely custom dynamic form builder to perform CRUD operations on all your portfolio data.
- **Secure Authentication**: Protected by JWT (JSON Web Tokens) and bcrypt password hashing.
- **Automated Password Reset**: Forgot your password? The login screen features a fully functional password reset flow using NodeMailer to send secure, time-limited reset link emails.
- **Robust API**: RESTful Express.js architecture managing seamless database connections to MongoDB Atlas.

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS (with custom animations and glassmorphic utilities)
- Framer Motion
- React Router DOM
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs
- NodeMailer 

---

## 🚀 Getting Started

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/shindeaditya07/YOUR_REPO_NAME.git
cd portfolio3
\`\`\`

### 2. Backend Setup
Navigate to the server directory and install dependencies:
\`\`\`bash
cd server
npm install
\`\`\`

Create a `.env` file based on `.env.example`:
\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
ADMIN_PASSWORD=your_bcrypt_hashed_password
ADMIN_EMAIL=your_email@gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
\`\`\`
*(Tip: You must use a bcrypt hash generator to create your initial `ADMIN_PASSWORD` string)*

Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
\`\`\`bash
cd client
npm install
\`\`\`

Start the frontend development server:
\`\`\`bash
npm run dev
\`\`\`
The application will be running at `http://localhost:5173`.

---

## ⚙️ Configuration & Content Management

### The Admin Panel
To manage your dynamic content (Projects, Experience, Publications, etc.):
1. Go to `http://localhost:5173/admin/login`.
2. Log in using your configured backend password.
3. Use the dynamic forms to add, edit, or delete items. Changes reflect instantly on your public site!

### The Constants File
To change foundational data like your logo name, bio, social links, or PDF resume name, edit `client/src/utils/constants.ts`. The UI will adapt automatically.

---

## 📝 License
Built by [Aditya Shinde](https://github.com/shindeaditya07). Feel free to use this architecture as inspiration for your own portfolio!
