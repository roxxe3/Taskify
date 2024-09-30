# Taskify API

Taskify API is a serverless task management API built using **FastAPI**, **AWS Lambda**, and **DynamoDB**. The API provides user-based task management, allowing users to create, read, update, and delete tasks.

## Features

- **Create Tasks**: Users can create tasks with descriptions and completion status.
- **Read Tasks**: Retrieve individual tasks or list all tasks for a user.
- **Update Tasks**: Modify task details such as description and completion status.
- **Delete Tasks**: Remove tasks from the database.
- **List User Tasks**: List up to 10 tasks for a specific user, sorted by creation time.

## Endpoints

### Create Task

- **URL**: `/tasks`
- **Method**: `POST`
- **Request Body**:
  - `description` (string): The description of the task.
  - `completed` (boolean): Task completion status (default: `false`).
  - `user_id` (string): User ID associated with the task.
  
- **Response**: Returns the created task object including task ID and creation time.

### Get Task

- **URL**: `/tasks/{task_id}`
- **Method**: `GET`
- **Path Parameters**:
  - `task_id` (string): Unique ID of the task.
  
- **Response**: Returns the task details if found, else returns a `404 Task not found` error.

### Update Task

- **URL**: `/tasks/{task_id}`
- **Method**: `PUT`
- **Path Parameters**:
  - `task_id` (string): Unique ID of the task.
  
- **Request Body**:
  - `description` (string): Updated description of the task.
  - `completed` (boolean): Updated completion status.
  
- **Response**: Returns the updated task details.

### Delete Task

- **URL**: `/tasks/{task_id}`
- **Method**: `DELETE`
- **Path Parameters**:
  - `task_id` (string): Unique ID of the task.
  
- **Response**: Returns `"done"` upon successful deletion.

### List User Tasks

- **URL**: `/list_tasks/{user_id}`
- **Method**: `GET`
- **Path Parameters**:
  - `user_id` (string): The user ID to filter tasks by.
  
- **Response**: Returns a list of up to 10 tasks for the specified user.
