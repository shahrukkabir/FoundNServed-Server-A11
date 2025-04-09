# WhereIsIt - Server Side

## Project Purpose

WhereIsIt (Server Side) acts as the backend for the Lost and Found platform. It handles database operations, user authentication, and API endpoints to support client-side functionalities.

## Live Demo

[Visit WhereIsIt Live Server](https://where-is-it-server.vercel.app/)

---

## Key Features

- **API Endpoints**: Provides RESTful APIs for managing posts, user data, and authentication.
- **MongoDB Integration**: Securely stores data in a NoSQL database.
- **JWT Authentication**: Protects private routes using JSON Web Tokens.
- **Secure Credentials**: Firebase and MongoDB credentials are stored in environment variables.
- **CORS Enabled**: Ensures secure cross-origin requests.

### Core Functionalities

- **User Authentication:**
  - JWT-based secure authentication.
  - Token validation for private routes.
- **API Endpoints:**
  - CRUD operations for Lost & Found items.
  - Filter and search functionality.
- **Database Integration:**
  - MongoDB for storing user and item data.
  - Environment variable-based credential security.
- **Data Validation:** Ensures data integrity for all endpoints.
- **Error Handling:** Provides meaningful error messages for all API failures.

### Deployment

- Hosted on Vercel.
- Environment variables for Firebase configuration and MongoDB credentials.
- CORS enabled for secure API requests.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT
- dotenv
- Mongoose

---

## Environment Variables

Set the following variables in a `.env` file:

- PORT=your_port MONGODB_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret

## API Endpoints

- **POST /api/items**: Add a new item.
- **GET /api/items**: Retrieve all items.
- **GET /api/items/:id**: Retrieve a specific item.
- **PUT /api/items/:id**: Update an item.
- **DELETE /api/items/:id**: Delete an item.
- **POST /api/recovered**: Mark an item as recovered.

## How to Run the Server Side Locally

### Prerequisites

- Node.js installed.
- MongoDB Atlas account or local MongoDB setup.

### Steps

1. Clone the repository.
2. Navigate to the `whereisit-server` directory.
3. Run `npm install` to install dependencies.
4. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   FIREBASE_API_KEY=<your_firebase_api_key>
   FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
   FIREBASE_PROJECT_ID=<your_firebase_project_id>
   FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
   FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
   FIREBASE_APP_ID=<your_firebase_app_id>
   ```
5. Start the server with `npm start` or `npm run dev` for development.

---

## Meaningful Commits (8+ Commits)

1. SetUp Server.
2. Acced recoveredCollection and get data.
3. recoveredCollection post data.
4. Added get myItems.
5. Added Delete Operation.
6. Added Update Operation.
7. Updated Put Operation.
8. Added Vercel.json File.

---

## Acknowledgments

Special thanks to the WhereIsIt team for the opportunity to work on this project.
