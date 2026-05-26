# Library Management System API

This is a Node.js & Express RESTful API for a Library Management System built with Mongoose and MongoDB.

## 1. Setup & Environment Variables
To run this project locally, ensure you have Node.js and MongoDB installed.

1. Clone the repository or open the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   MONGODB_URL=mongodb://localhost:27017/libraryDB
   ```

## 2. How to Run
* To start the server normally:
  ```bash
  npm start
  ```
* To start the server in development mode with auto-reload:
  ```bash
  npm run dev
  ```

## 3. Database Design Documentation
The complete schema design, relationships mapping, actor privileges, and detailed business rule descriptions can be found in the dedicated documentation file linked below:
* [Go to DATABASE_DESIGN.md](./DATABASE_DESIGN.md)

## 4. Example Requests (API Endpoints Guide)
You can test the core APIs using Postman or Thunder Client with these example JSON bodies:

### A. Add a New Member User
* **Method**: `POST`
* **URL**: `http://localhost:3000/api/v1/users`
* **Body**:
  ```json
  {
    "role": "Member",
    "name": "Samer Aly",
    "phone": "0987654321",
    "email": "samer@example.com",
    "password": "123",
    "address": "Damascus",
    "membershipNumber": "M-2026"
  }
  ```

### B. Add a New Material Item (By Manager)
* **Method**: `POST`
* **URL**: `http://localhost:3000/api/v1/material`
* **Body**:
  ```json
  {
    "materialType": "book",
    "title": "Introduction to JS",
    "publisher": "Science Press",
    "totalCopies": 5,
    "availableCopies": 5,
    "year": 2026,
    "category": "science",
    "ISBN": "978-3-16-148410-0",
    "userID": "MANAGER_USER_ID_HERE"
  }
  ```

### C. Issue a New Loan
* **Method**: `POST`
* **URL**: `http://localhost:3000/api/v1/loans`
* **Body**:
  ```json
  {
    "materialsId": "MATERIAL_ID_HERE",
    "memberId": "MEMBER_ID_HERE"
  }
  ```

### D. Make a Reservation
* **Method**: `POST`
* **URL**: `http://localhost:3000/api/v1/reservation`
* **Body**:
  ```json
  {
    "materialsId": "MATERIAL_ID_HERE",
    "memberId": "MEMBER_ID_HERE"
  }
  ```

### E. Submit a Review
* **Method**: `POST`
* **URL**: `http://localhost:3000/api/v1/review`
* **Body**:
  ```json
  {
    "materialsId": "MATERIAL_ID_HERE",
    "memberId": "MEMBER_ID_HERE",
    "stars": 5,
    "comment": "Highly recommended textbook!"
  }
  ```
