🧠 Cybernauts Development Assignment

A full-stack web app built with React, Node.js (Express), and MongoDB.
It lets users create profiles, list hobbies, and visualize user relationships as a social graph using React Flow.

🚀 Features

🧍‍♂️ Add, edit, and delete user profiles

🎯 Filter users by hobbies

🕸️ Visual graph of users and their friend connections

⚡ Real-time updates every 5 seconds

💾 Backend REST APIs with Express & MongoDB

🔗 Relationship creation (connect two users visually)

🛠️ Tech Stack

Frontend

React (Vite)

Axios

React Flow

Lucide-React (icons)

React-Toastify (notifications)

TailwindCSS

Backend

Node.js + Express

MongoDB + Mongoose

CORS & JSON middleware
```
📁 Folder Structure
📦 Cybernauts-Development-Assignment
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┣ UserGraph.jsx
 ┃ ┃ ┃ ┗ UserProfile.jsx
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┃ ┗ Home.jsx
 ┃ ┃ ┗ App.jsx
 ┗ 📂 backend
   ┗ server.js
```
⚙️ Setup & Run
1️⃣ Clone the repository
```
git clone https://github.com/<your-username>/Cybernauts-Development-Assignment.git
cd Cybernauts-Development-Assignment
```

2️⃣ Backend setup
```
cd backend
npm install
```

Start MongoDB locally:
```
sudo systemctl start mongod
```

Run backend:
```
node server.js
```


3️⃣ Frontend setup
```
cd ../frontend
npm install
npm run dev
```


🌐 API Endpoints
Method	Endpoint	Description
POST	/api/users	Create new user
GET	/api/users	Fetch all users
PUT	/api/users/:id	Update user by ID
DELETE	/api/users/:id	Delete user by ID
POST	/api/users/relationship	Create a friendship between two users
GET	/api/users/graph	Fetch graph data for visualization
🧩 Example JSON
{
  "name": "John Doe",
  "age": 22,
  "hobbies": "Reading"
}

🪄 How to Create Relationships

Open the app in browser.

Use the Add User button to add multiple users.

In the graph section, connect two nodes manually — it automatically updates backend.

💾 Database

MongoDB database name: cybernauts
Collections:

users (stores name, age, hobbies, friends)

💡 Future Improvements

Add JWT login system

Add search & filter for graph

Deploy backend on Render / Railway

Host frontend on Vercel

👨‍💻 Developer

Mayank Chauhan
