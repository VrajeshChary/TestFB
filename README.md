
# Facebook Login Page Clone

This project is a clone of Facebook's login page with a working backend for user registration and login functionality. The backend stores user data in an SQLite database.

## Features

- Exact replica of Facebook's login page UI
- Functional login form with validation
- Registration modal with form validation
- Backend API for user registration and authentication
- SQLite database for data storage
- Password encryption with bcrypt

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Running the application

Start the server:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

- `server.js` - Express server and API endpoints
- `public/` - Static files
  - `index.html` - Facebook login page HTML
  - `styles.css` - CSS styling
  - `script.js` - Frontend JavaScript

## Database

The application uses an SQLite database file (`facebook_clone.db`) that is created automatically when the server starts.

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Authenticate a user

## Security Notes

For educational purposes only. This clone demonstrates how to create a replica of Facebook's login page with basic functionality. Do not use this to impersonate Facebook or for any malicious purposes.

## Disclaimer

This project is for educational purposes only. It is not affiliated with Facebook/Meta in any way.
