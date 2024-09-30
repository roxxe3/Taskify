# Taskify - Serverless To-Do List Application

Taskify is a serverless to-do list application designed to help users manage tasks efficiently. Built using AWS Lambda, DynamoDB, and AWS Cognito, Taskify provides secure user authentication and scalable CRUD operations for task management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Challenges](#challenges)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Features

- **User Authentication**: Secure login and registration using AWS Cognito.
- **Task Management**: Create, read, update, and delete tasks.
- **Serverless Backend**: Powered by AWS Lambda and DynamoDB.
- **Responsive Design**: Built with Next.js and Tailwind CSS for a responsive user interface.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [AWS Lambda](https://aws.amazon.com/lambda/), [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: [DynamoDB](https://aws.amazon.com/dynamodb/)
- **Authentication**: [AWS Cognito](https://aws.amazon.com/cognito/)
- **API Management**: [AWS API Gateway](https://aws.amazon.com/api-gateway/)
- **Deployment**: AWS CloudFormation, AWS S3, and AWS API Gateway

---

## Architecture Overview

The Taskify application is built using a serverless architecture:

1. **Frontend**: Next.js for the user interface, interacting with AWS Lambda for backend operations.
2. **Backend**: AWS Lambda functions handle CRUD operations and interact with DynamoDB.
3. **Database**: DynamoDB stores all task data in a scalable, NoSQL database.
4. **Authentication**: AWS Cognito handles user authentication and security.
5. **API Gateway**: AWS API Gateway manages the interaction between frontend and backend.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [AWS CLI](https://aws.amazon.com/cli/) configured
- [Docker](https://www.docker.com/) for DynamoDB Local (optional for local development)

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/taskify.git
   cd taskify/todo-site
2. Install dependencies:
   ```bash
   npm install
   
3. Start the development server:
   ```bash
    npm run dev
