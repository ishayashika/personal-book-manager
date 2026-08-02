# 📚 Personal Book Manager

A full-stack MERN application that helps users manage their personal book collection. Users can securely register, log in, add books, update them, delete them, and track their reading progress through an interactive dashboard.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

### 📚 Book Management
- Add a Book
- Edit Book Details
- Delete a Book
- View All Books
- Filter Books by Reading Status
- Search Books by Tags

### 📊 Dashboard
- Total Books
- Want to Read Count
- Reading Count
- Completed Count
- Responsive Book List

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## 📂 Project Structure

```
personal-book-manager/
│
├── client/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/ishayashika/personal-book-manager.git
```

Move into the project folder

```bash
cd personal-book-manager
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run the backend

```bash
npm start
```

---

## Frontend Setup

Open another terminal.

```bash
cd client
npm install
npm run dev
```

The frontend will run on

```
http://localhost:3000
```

The backend will run on

```
http://localhost:5000
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

### Books

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/books` | Get All Books |
| POST | `/api/books` | Add Book |
| PUT | `/api/books/:id` | Update Book |
| DELETE | `/api/books/:id` | Delete Book |
| GET | `/api/books/dashboard` | Dashboard Statistics |

---

## Author

**Yashika Kumari**

