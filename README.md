# Task Management System

This project is a backend API for a Task Management System built with Node.js, Express, and MongoDB. The system allows users to create, update, and manage tasks with various features such as prioritization, deadlines, team collaboration, recurring tasks, and real-time updates using WebSockets. Authentication is managed through JWT, with role-based access control (RBAC) for team roles.

## Features

- **Task Management**: Create, update, delete tasks, and assign them to users or teams.
- **Team Collaboration**: Users can create teams and assign tasks based on roles (Owner, Admin, Member).
- **Role-Based Access Control (RBAC)**: Role-based permissions to manage and access tasks and team settings.
- **Task Dependencies**: Tasks can have dependencies that must be completed before moving forward.
- **Recurring Tasks**: Automatically create recurring tasks (daily, weekly, monthly).
- **Notifications**: Email and in-app notifications for overdue tasks and approaching deadlines.
- **Real-Time Updates**: WebSocket support for real-time task updates across team members.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (Local or Cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system

2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory with the following values:
   ```bash
   PORT=3000
   MONGODB_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
4. Start the server:
   ```bash
   npm start
5. The server will be running at http://localhost:8080

## API Endpoints
### User Endpoints
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in and receive a JWT token
- **GET /api/users/me:**:  Get current user details (Protected)

### Task Endpoints
- **POST /api/tasks**: Create a new task (Protected)
- **GET /api/tasks**: Get all tasks with filtering, sorting, and pagination (Protected)
- **PUT /api/tasks/:taskId**: Update a task (Protected)
- **DELETE /api/tasks/:taskId**: Delete a task (Protected)
- **PATCH /api/tasks/:taskId/complete**: Mark a task as complete (Protected)
### Team Endpoints
- **POST /api/teams**: Create a new team (Protected)
- **GET /api/teams/:teamId**: Get team details (Protected)
- **PUT /api/teams/:teamId**: Update team details (Owner only)
- **DELETE /api/teams/:teamId**: Delete a team (Owner only)
### Middleware
- **Authentication**: JWT-based authentication middleware to protect routes.
- **RBAC** : Role-based access control for teams.
### Technologies
- **Node.js and Express for server-side logic**
- **MongoDB for database storage**
- **JWT for user authentication**
- **Nodemailer for email notifications**
- **WebSocket for real-time updates**
