TaskFlow - MERN Stack Task Manager

TaskFlow is a modern, full-stack task management application designed to help users organize their daily goals efficiently. Built with the MERN Stack (MongoDB, Express, React, Node.js), it features a secure authentication system, a premium UI built with Tailwind CSS, and real-time task updates.


FEATURES

Secure Authentication: User Registration and Login using JWT (JSON Web Tokens).

Task Management: Create, Read, Update, and Delete (CRUD) tasks effortlessly.

Glassmorphism UI: A beautiful, modern interface with transparency and blur effects.

Search and Filter: Instantly filter tasks by status (Pending/Completed) or search by text.

Fully Responsive: Works perfectly on desktops, tablets, and mobile phones.

Real-time Feedback: Toast notifications for success and error messages.

Profile System: Update user details securely.


TECH STACK

Frontend:
```
React.js

Tailwind CSS (Styling)

React Router DOM (Navigation)

React Hot Toast (Notifications)

```

Backend:
```
Node.js and Express.js (Server)

MongoDB and Mongoose (Database)

Bcrypt.js (Password Hashing)

JWT (Authentication)

Cors (Cross-Origin Resource Sharing)
```

GETTING STARTED

Follow these steps to run the project locally on your machine.

Clone the Repository
```
git clone https://github.com/ThakkallapallyRuthvik/TaskManager.git
cd TaskManager
```
Backend Setup

Navigate to the backend folder and install dependencies.
```
cd backend
npm install
```

Create a .env file inside the backend folder and add your credentials:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here
```

Start the backend server:
```node server.js```
(The server should run on http://localhost:5000)

Frontend Setup

Open a new terminal window, navigate to the frontend folder, and install dependencies.
```
cd ../frontend
npm install
```

Start the React application:
```npm start```
(The app should run on http://localhost:3000)


PROJECT STRUCTURE

```
TaskManager/
│
├── backend/          (API and Database Logic)
│   ├── config/       (MongoDB Connection)
│   ├── controllers/  (Auth and Task Logic)
│   ├── models/       (Database Schemas)
│   ├── routes/       (API Routes)
│   └── server.js     (Server Entry Point)
│
└── frontend/         (React User Interface)
    ├── src/
        ├── components/  (Modals, Tables, Navbar)
        ├── context/     (Global State - Auth)
        ├── pages/       (Login, Register, Dashboard)
        └── index.css    (Tailwind Global Styles)
```

API ENDPOINTS
```
POST   /api/auth/register - Register a new user
POST   /api/auth/login    - Login user and get token
GET    /api/tasks         - Get all tasks for logged in user
POST   /api/tasks         - Create a new task
PUT    /api/tasks/:id     - Update selected task
DELETE /api/tasks/:id     - Delete selected task

```
FUTURE IMPROVEMENTS AND SCALABILITY

If this application were to scale to thousands of users, I would implement the following specific optimizations:

Handling Large Data (Pagination)
Current State: The frontend fetches all tasks at once.
Problem: If a user has 5,000 tasks, the dashboard will become slow and the API response will be huge.
Solution: Implement Pagination on the backend (e.g., GET /tasks?page=1&limit=10). This way, we only load the 10 most relevant tasks initially, reducing load times significantly.

Real-Time Updates (WebSockets)
Current State: Users must refresh the page to see changes if they are logged in on multiple devices.
Problem: If I mark a task as "Completed" on my phone, my laptop dashboard still shows it as "Pending."
Solution: Integrate Socket.io to push updates instantly. When a task is updated, the server broadcasts the change to all active sessions for that user.

Database Indexing
Current State: The database searches through every document to find a user's tasks.
Problem: As the database grows, queries for "Pending" tasks will become slow.
Solution: Create MongoDB indexes specifically on the userId and status fields. This acts like a "Table of Contents" for the database, making filter queries instant.

Offline Mode (PWA)
Current State: The app requires an internet connection to work.
Problem: Users cannot check their tasks while traveling or offline.
Solution: Convert the React app into a Progressive Web App (PWA) and use localStorage to cache tasks. Users could view and edit tasks offline, and changes would sync to the server once the connection is restored.


AUTHOR

Ruthvik Thakkallapally
