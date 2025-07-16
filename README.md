# TaskFlow – Task Management App

**TaskFlow** is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that helps individuals efficiently manage tasks, organize them into categories, track progress and task statistics through a dashboard, monitor deadlines using a calendar view, and store personal notes.

## Features

- User Registration & Login (JWT-based authentication)
- Add, Edit, Delete, and View Tasks
- Create, Edit, and Delete Task Categories
- Calendar View for tasks (by date, week, month)
- Search tasks by title with instant suggestions
- Quick Notes: Jot down reminders or ideas
- Dashboard to show progress and tasks status
- Basic Notification Support
- User Profile: Edit profile, logout securely
- Fully responsive UI for all screen sizes

## Tech Stack

### Frontend:
- React.js (Vite)
- Tailwind CSS
- FullCalendar
- Axios
- React Router

### Backend:
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for auth
- CORS, dotenv, bcrypt


## Installation & Setup 

### 1. Clone the Repository

```bash
git clone https://github.com/gouravm2005/taskflow.git
cd taskflow
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

#### Create a `.env` file in the `Backend/ folder`:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### Run the backend:
```bash 
npm start
```

### 3. Setup Frontend
```bash
cd Frontend
npm install
```

#### Create a `.env` file in the `Frontend/ folder`:

```bash
VITE_BASE_URL = http://localhost:5000
```

#### Run the frontend:
```bash
npm run dev
```

## Running the Application 

- The frontend will run on `http://localhost:5173`  
- The backend will run on `http://localhost:5000`


## API Endpoints

> **Base URL:** `http://localhost:5000/api`


### Auth Routes

| Method | Endpoint                | Description        |
|--------|-------------------------|--------------------|
| POST   | `/auth/register`        | Register new user  |
| POST   | `/auth/login`           | Login user         |
| POST   | `/auth/logout`          | Logout user        |
| POST   | `/auth/editprofile/:id` | Edit user name     |
| GET    | `/auth/profile`         | Get user profile   |


### Task Routes

| Method | Endpoint                | Description       |
|--------|-------------------------|-------------------|
| POST   | `/task/createtask`      | Add a new task    |
| GET    | `/task/Alltasks`        | Get all tasks     |
| GET    | `/task/gettask/:id`     | Get single task   |
| POST   | `/task/edittask/:id`    | Update task       |
| DELETE | `/task/removetask/:id`  | Delete task       |


### Category Routes

| Method | Endpoint                | Description         |
|--------|-------------------------|---------------------|
| POST   | `/category/create`      | Create a category   |
| GET    | `/category/all`         | Get all categories  |
| POST   | `/category/edit/:id`    | Update category     |
| DELETE | `/category/delete/:id`  | Delete category     |


### Quick Notes Routes

| Method | Endpoint                 | Description    |
|--------|--------------------------|----------------|
| POST   | `/note/addnote`          | Add a new note |
| GET    | `/note/notes`            | Get all notes  |
| POST   | `/note/editnote/:id`     | Edit note      |
| DELETE | `/note/deletenote/:id`   | Delete note    |

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
