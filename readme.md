# Mini Loan Application

A mini-loan application built with the MERN stack, utilizing TypeScript and Tailwind CSS for styling. This application allows authenticated users to apply for loans, make repayments, and for admins to approve loans.


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)

## Features

1. **User Authentication**: Users can register and log in to manage their loans.
2. **Loan Application**: Customers can apply for loans by specifying the amount and term.
3. **Loan Approval**: Admins can approve loan applications.
4. **Repayment Management**: Customers can submit repayments for their loans.
5. **Loan Status Tracking**: Users can view the status of their loans and repayments.
6. **Responsive Design**: The application is responsive and works on both web and mobile devices.

## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Project Structure

This repository contains two main folders:
1. **server**: Contains the backend code (API and server logic).
2. **website**: Contains the frontend code (React + Vite).


## Installation

To install and set up the application locally, follow these steps:
### 1. Clone the repository
```bash
git clone https://github.com/JatinDhamija816/loan.git
cd loan
```

### 2. Backend Setup (Server)
```bash
cd server
npm install
npm run build
```

Create a .env file in the server directory and add the following variables:

```bash
MONGODB_URI = mongodb://localhost:27017/mini-loan-app

PORT = 8000

ACCESS_TOKEN_SECRET = jwt_secret
ACCESS_TOKEN_EXPIRY = 7D
REFRESH_TOKEN_SECRET = jwt_secret
REFRESH_TOKEN_EXPIRY = 30D
```

To start the backend server, use:

```bash
npm run start
```

The Backend is a Node.js/Express application using TypeScript and MongoDB as the database

### 3. Frontend Setup (Website)

```bash
cd ../website
npm install
```

To start the frontend in development mode using Vite, run:

``` bash
npm run dev
```

The frontend will be available at http://localhost:5173 (or any port specified by Vite).


## Usage
Once the backend and frontend are running, you can access the loan application via your browser. You can:

- Register a New User: Go to the registration page and fill out the form.
- Log In: Use your credentials to log in.
- Apply for a Loan: Fill out the loan application form with the required details.
- Admin Approval: Log in as an admin to approve pending loans.
- Make Repayments: Customers can submit repayments for their loans.
- View Loan Status: Users can view the status of their loans and repayments in their dashboard.
