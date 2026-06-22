# CodeCraftHub

A simple, beginner-friendly REST API built with Node.js and Express to track courses you want to learn. Data is stored in a JSON file (courses.json) instead of a database. No authentication, just learning REST basics.

---

## Overview

- Tech: Node.js + Express
- Data store: JSON file (courses.json) in the project root
- Endpoints under: `/api/courses`
- CRUD operations:
  - Create, Read (all or one), Update, Delete
- Each course includes:
  - id: auto-generated integer (starting from 1)
  - name: required string
  - description: required string
  - target_date: required string in YYYY-MM-DD
  - status: required string, one of: "Not Started", "In Progress", "Completed"
  - created_at: auto-generated ISO timestamp
- First run auto-creates `courses.json` if missing
- Server runs on port 5000

---

## Features

- CRUD endpoints for managing courses
- Auto-incrementing id starting at 1
- Strict validation for required fields and allowed status values
- Date validation for `target_date` (YYYY-MM-DD)
- Auto-creation of the data file if it doesn't exist
- Simple structure suitable for beginners

---

## Installation

Prerequisites:
- Node.js (18.x+ recommended)

Steps:
1. Create the project folder (the structure below) and navigate into it.
2. Install dependencies (Express).

Install steps (assuming you place files as shown):
- npm install
- Note: The server code is designed to run from src/app.js if you follow the "src" layout.

---

## Running application

- Start the server (port 5000):
  - If you placed app.js at project root: node app.js
  - If you followed the src layout shown above: node src/app.js (or npm start if you configure it)
- Open in your browser or via curl:
  - http://localhost:5000/api/courses

---

## API Endpoints

All endpoints are under /api/courses

- POST /api/courses
  - Description: Add a new course
  - Required body (JSON): 
    {
      "name": "Course Name",
      "description": "Course description",
      "target_date": "YYYY-MM-DD",
      "status": "Not Started" | "In Progress" | "Completed"
    }
  - Responses:
    - 201 Created: returns the created course
    - 400 Bad Request: missing fields, invalid date, or invalid status
    - 500 Internal Server Error: IO or server error

- GET /api/courses
  - Description: Get all courses
  - Responses:
    - 200 OK: array of course objects
  - Optional query to fetch a specific course: /api/courses?id=1
    - Responses:
      - 200 OK: single course object
      - 404 Not Found: if the id does not exist
      - 400 Bad Request: invalid id parameter

- PUT /api/courses
  - Description: Update a course
  - Required body (JSON): 
    {
      "id": 1,
      // any fields to update (name, description, target_date, status)
    }
  - Responses:
    - 200 OK: updated course
    - 400 Bad Request: missing id or invalid fields (e.g., invalid date or status)
    - 404 Not Found: course with given id does not exist
    - 500 Internal Server Error: IO or server error

- DELETE /api/courses
  - Description: Delete a course
  - Required body (JSON):
    {
      "id": 1
    }
  - Responses:
    - 200 OK: deleted course object
    - 400 Bad Request: missing id
    - 404 Not Found: course with given id does not exist
    - 500 Internal Server Error: IO or server error

Note: This API uses a JSON file and a simple in-memory-like approach (read-modify-write). It’s great for learning REST basics but not ideal for high-concurrency production scenarios.

---

## Testing

You can test using curl (examples assume the server is running on localhost:5000):

- Create a new course
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name":"Intro to Node.js","description":"Learn the basics of Node.js and Express","target_date":"2026-12-31","status":"Not Started"}' \
    http://localhost:5000/api/courses

- Get all courses
  curl http://localhost:5000/api/courses

- Get a specific course by id (via query param)
  curl "http://localhost:5000/api/courses?id=1"

- Update a course (e.g., change status)
  curl -X PUT \
    -H "Content-Type: application/json" \
    -d '{"id":1,"status":"In Progress"}' \
    http://localhost:5000/api/courses

- Delete a course
  curl -X DELETE \
    -H "Content-Type: application/json" \
    -d '{"id":1}' \
    http://localhost:5000/api/courses

Tip: For readability, you can pipe outputs to a file or use a REST client like Postman or Insomnia.

---

## Troubleshooting

- Problem: Server returns 400 for missing fields
  - Solution: Ensure the request body contains all required fields:
    - name, description, target_date, and status for POST
    - id for PUT/DELETE
    - target_date must be in YYYY-MM-DD format
    - status must be one of: Not Started, In Progress, Completed

- Problem: 400 or 404 for target_date or status
  - Solution: Validate date format (YYYY-MM-DD) and status values. Update the request payload accordingly.

- Problem: 500 Internal Server Error
  - Solution: Check console/logs for IO errors. Ensure the project has write permissions to create/read the data file (courses.json). The app creates the file automatically if missing.

- Problem: Data file not created automatically
  - Solution: Ensure the app has permission to write in the project directory. The app should auto-create courses.json on first run.

- Problem: Port in use or server not reachable
  - Solution: Make sure nothing else is running on port 5000. If needed, change PORT in the code and restart.

---

## Project Structure (recap)

CodeCraftHub/
- data/
  - courses.json            // JSON file to store courses (an array)
- src/
  - app.js                   // Express app and route mounting
  - coursesStorage.js               // Helpers to read/write the JSON file
  - routes/
    - courseRoutes.js             // REST API routes for courses
- package.json
- README.md

---
