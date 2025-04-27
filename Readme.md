- [POSTMAN link](https://app.getpostman.com/join-team?invite_code=3ee466d4637385ed64f85ad06ccf229f206e2b312fa1936b4b79f5d89cc6898e&target_code=a20e294c5419b8455380063d183c1fb4)
- [Video for clarifying](https://drive.google.com/file/d/1dogeYHtglDMp8ulbY1EN4zax1DcxojPI/view?usp=sharing)
- username: ziad, password: 123

## 🧾 Installments Management System (Warehouse)

A full-stack web application for managing product installments, purchases, and customer payments. Built with the MERN stack, PostgreSQL, and Docker, this system enables warehouse operators to efficiently track product sales, installment plans, and payment schedules.
 
## ✨ Features

- 📦 Product creation and inventory tracking

- 👥 Customer registration and management

- 🧾 Purchase tracking with multiple installment periods

- 📉 Interest rate calculations per installment

- 💰 Payment logging and remaining balance tracking

- 🔐 Role-Based Access Control (RBAC) only admin rightnow

- 🛡️ Secure authentication with JWT and cookies

- 📈 Admin dashboard for analytics and reports

- 🐳 Docker-based development environment

- 🧠 Backend built with MongoDB & Node.js

- ⚡ Optimized with caching using Redis

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

- Redis

- JWT, Cookies

# Alert (If u do not need redis)

Go to controllers and remove every single redisClient operation then go to server file in server folder then remove or comment import {connectDB} and connectDB() and here u r working with no cach and redis

🔧 Getting Started

1. Clone the Repository
   bash

```
git clone https://github.com/AhmedIssawy/Installments-mangement-system-warehouse.git
cd Installments-mangement-system-warehouse
```

2. Set Up Environment Variables

# Backend .env (inside /server folder)

.env

```
PORT=5000
MONGODB_URI=your-mongo-URI || mongodb://127.0.0.1:27017/warehouse
JWT_SECRET=your-mongo-uri
CLIENT_URL=http://localhost:5173
NODE_ENV=development
JWT_EXPIRES_IN=10d
REDIS_USERNAME=your-redis-username || remove it from config/redis.js
REDIS_PASSWORD=your-redis-password || remove it from config/redis.js
REDIS_HOST=your-redis-host
REDIS_PORT=your-redis-port || 18914
ADMIN_USERNAME=your-admin-name
ADMIN_PASSWORD=your-password
```

# Frontend .env (inside /client folder)

env

```
VITE_API_URL=http://localhost:5000
```

### If u r going to use docker u have to make docker.env

# Backend docker.env (inside /server folder)

```
PORT=5000
MONGODB_URI=your-mongo-URI || mongodb://mongo:27017/warehouse
JWT_SECRET=your-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
REDIS_USERNAME=your-redis-username || remove it from config/redis.js
REDIS_PASSWORD=your-redis-password || remove it from config/redis.js
REDIS_HOST=your-redis-host
REDIS_PORT=your-redis-port || 18914
JWT_EXPIRES_IN=10d
ADMIN_USERNAME=your-admin-name
ADMIN_PASSWORD=your-password-name
```

# Frontend docker.env (inside /client folder)

```
VITE_API_URL=http://installments-backend:5000
```

3. Install Dependencies
   Using Docker
   bash

```
docker-compose up
```

Or using npm
bash

```
cd server
npm install
cd ../client
npm install
cd ..
npm run dev
```

## 📸 Screenshots

### Home page

![image](https://github.com/user-attachments/assets/f9713581-46f2-4929-a3f7-f50641982599)

## Login page

![image](https://github.com/user-attachments/assets/49055c3e-e141-4c37-bab0-7fbb079dbc2e)

### Customers page

![image](https://github.com/user-attachments/assets/2f476cc2-817e-4856-b3d6-ebcd77ea5d58)

### Customer page

![image](https://github.com/user-attachments/assets/4afccacd-da9f-45c0-9343-f963e55d7dc8)

### Buying page

### ![image](https://github.com/user-attachments/assets/caba9fda-1ba8-4980-9c73-764461587531)

### Products page

![image](https://github.com/user-attachments/assets/d1c9b25f-29ce-4575-8193-959d8865dd89)

## 🎥 Video for clarification

[Video](https://drive.google.com/file/d/1dogeYHtglDMp8ulbY1EN4zax1DcxojPI/view?usp=sharing)

## 🔮 Future Suggestions

Real-time notifications using WebSockets

Monthly report generation (PDF exports)

SMS/email reminders for overdue payments

Mobile app version for delivery agents

Adding several languages using i18nextjs

## 👨‍💻 Author

Ahmed Issawy

📍 Cairo, Egypt

🔗 [LinkedIn](https://www.linkedin.com/in/ahmed-issawy-fares/)

## 📄 License

Free to use for personal or commercial projects.
