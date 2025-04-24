## 🧾 Installments Management System (Warehouse)
A full-stack web application for managing product installments, purchases, and customer payments. Built with the MERN stack, PostgreSQL, and Docker, this system enables warehouse operators to efficiently track product sales, installment plans, and payment schedules.

## ✨ Features
- 📦 Product creation and inventory tracking

- 👥 Customer registration and management

- 🧾 Purchase tracking with multiple installment periods

- 📉 Interest rate calculations per installment

- 💰 Payment logging and remaining balance tracking

🔐 Role-Based Access Control (RBAC) only admin rightnow

🛡️ Secure authentication with JWT and cookies

📈 Admin dashboard for analytics and reports

🐳 Docker-based development environment

🧠 Backend built with MongoDB & Node.js

⚡ Optimized with caching using Redis & rate limiting

## 🛠️ Tech Stack

# Frontend

- React

- Tailwind CSS

- DaisyUI

- Redux Toolkit

# Backend

- Node.js

- Express.js

- MongoDB + mongoose

- Redis (optional for caching)

JWT, Cookies

🔧 Getting Started
1. Clone the Repository
bash
``
git clone https://github.com/AhmedIssawy/Installments-mangement-system-warehouse.git
cd Installments-mangement-system-warehouse
``
2. Set Up Environment Variables
Backend .env (inside /server folder)
.env
PORT=5000
MONGODB_URI=your-mongo-URI || mongodb://127.0.0.1:27017/warehouse
JWT_SECRET=your-mongo-uri
CLIENT_URL=http://localhost:5173
NODE_ENV=development
JWT_EXPIRES_IN=10d
ADMIN_USERNAME=your-admin-name
ADMIN_PASSWORD=your-password-name

# Frontend .env (inside /client folder)
env

NODE_ENV=development
VITE_API_URL=http://localhost:5000/api

- If u r going to use docker u have to make docker.env
# Backend (inside /server folder)
PORT=5000
MONGODB_URI=your-mongo-URI || mongodb://mongo:27017/warehouse
JWT_SECRET=your-mongo-uri
CLIENT_URL=http://localhost:5173
NODE_ENV=development
JWT_EXPIRES_IN=10d
ADMIN_USERNAME=your-admin-name
ADMIN_PASSWORD=your-password-name

# Frontend (inside /client folder)

VITE_API_URL=http://installments-backend:5000

3. Install Dependencies
Using Docker
bash
``
docker-compose up
``
Or using npm
bash
``
# Backend
cd server
npm install

# Frontend
cd ../client
npm install

``

Then run:

bash
``
cd .. 
npm run dev
``
📸 Screenshots
Dashboard
Add your dashboard image here

Customer Installments View
Add customer payment timeline UI here

Purchase Form
Include a form screenshot here

More screenshots and videos coming soon.
🎥 Video for clarification

🔮 Future Suggestions
Real-time notifications using WebSockets

Monthly report generation (PDF exports)

SMS/email reminders for overdue payments

Mobile app version for delivery agents

👨‍💻 Author

Ahmed Issawy

📍 Cairo, Egypt

🔗 LinkedIn

📄 License
Free to use for personal or commercial projects.