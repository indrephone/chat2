# chat2

This is a full-stack chat app built with a MERN (MongoDB, Express, React, NodeJS) stack

---

## Table of Contents

- [MERN Chat App](#chat2)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Cloning the Project](#cloning-the-project)
  - [Frontend (Client) Setup](#frontend-client-setup)
  - [Backend (Server) Setup](#backend-server-setup)
  - [Development](#development)
  - [Running the Application](#running-the-application)
  - [Scripts](#scripts)
  - [License](#license)

---

## Prerequisites

- **Node.js** (v20.6.0 or higher) installed on your system. This version  is required to support the `--env-file` and `--watch` options in your backend scripts
- **MongoDB** instance or MongoDB Atlas setup
- **npm** or **yarn** package manager

---

## Cloning the Project

You can clone this repository from Github using the following command:

 git clone https://github.com/indrephone/chat2.git

After cloning the repository, follow the setup instructions below for both the frontend and backend. 

---

## Frontend (Client) Setup

### Tech Stack

- React
- React Router DOM
- Styled Components
- Vite (for development)

### Steps to Run the Frontend

1. Navigate to the `client` directory:

   ```zsh
   cd client
   ```

2. Install dependencies:   

   ```zsh
   npm install
   ```

3. Run the development server:

   ```zsh
   npm run dev
   ``` 

4. The app will run by default at `http://localhost:5173` unless configured otherwise.

---

## Backend (Server) Setup

### Tech Stack

- Express
- MongoDB
- CORS
- Environment Variables

### Steps to Run the Backend

1. Navigate to the `server` directory:

   ```zsh
   cd server
   ```

2. Install dependencies:   

   ```zsh
   npm install
   ```   

3. Copy the provided `.env.example` file and rename it to `.env`:

   ```zsh
   cp .env.example .env
   ``` 

4. Change the provided `.env.example` file to `.env` and update it with your configuration details:

   ```ini
   SERVER_PORT=5500
   CLIENT_PORT=5173
   DB_USER=<your_db_username>
   DB_PASSWORD=<your_db_password>
   DB_CLUSTER=<your_cluster_name>
   DB_NAME=<your_database_name>
   ```
   Ensure that your MongoDB credentials and cluster information are filled in correctly.

5. Run the backend server:

  ```zsh
   npm run dev
   ``` 

6. The backend server will run on `http://localhost:5001` by default.   

---

## Development

### Folder Structure

chat2/
|-- client/
|  |-- node_modules/
|  |-- public/
|  |-- src/
|  |-- .gitignore
|  |-- eslint.config.js
|  |-- index.html
|  |-- package-lock.json
|  |-- package.json
|  |-- README.md
|  |-- tsconfig.app.json
|  |-- tsconfig.json
|  |-- tsconfig.node.json
|  |-- vite.config.ts
|-- server/
|  |-- node_modules/
|  |-- .env
|  |-- .gitignore
|  |-- index.js
|  |-- package-lock.json
|  |-- package.json
|-- .gitignore
|-- README.md

- `client/src` has App.tsx, index.css, main.tsx and vite-env.d.ts files and components and contexts folders.
- `client/src/components` have outlets, pages, protection, styles and UI folders.
- `client/src/components/UI` have:
  - `atoms`: Contains reusable components like `MessageInput`.
  - `molecules`: Contains reusable components like `AllConversationsCard`, `AllUsersCard`, `MessageList`.
  - `organisms`: Contains reusable components like `DeleteConversationsButton`, `Header`, `LikeButton`, `MessageCard`.

In `App` routes are using `outlets` folder containing `BaseOutlet`.   

- `client/src/contexts` have `UsersContext`, `ConversationsContext` and `MessagesContext` files.

---

## Running the Application

1. Ensure both frontend and backend servers are running:

   - Frontend at `http://localhost:5173`
   - Backend at `http://localhost:5001`

2. The client communicates with the server for chat related data using REST APIs.

---

## Scripts

### Frontend:

- `npm run dev` : Runs the Vite development server.
- `npm run build` : Builds the production-ready files.

### Backend:

- `npm run dev` : Runs the Express backend server using the `.env` configuration.

---

## License

This project is licensed under the ISC License.