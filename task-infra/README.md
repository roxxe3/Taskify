Here's a `README.md` for your infrastructure code that defines the AWS resources for the serverless to-do list application "Taskify."

---

# Taskify Infrastructure

This repository contains the AWS CDK infrastructure code for the serverless to-do list application, **Taskify**. The infrastructure is deployed using the AWS Cloud Development Kit (CDK) and includes a DynamoDB table, a Lambda function, and a Lambda layer.

## Prerequisites

Before deploying the infrastructure, ensure you have the following installed:

- **AWS CDK**: [AWS CDK Installation Guide](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)
- **AWS CLI**: [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- **Node.js**: Ensure you have Node.js installed to run the CDK.

## Stack Components

### 1. **DynamoDB Table**
- **Table Name**: TaskTable
- **Primary Key**: `task_id` (String)
- **Time to Live (TTL)**: Items expire based on the `ttl` attribute.
- **Global Secondary Index (GSI)**:
  - **Index Name**: `user_index`
  - **Partition Key**: `user_id` (String)
  - **Sort Key**: `created_time` (Number)
  
This table stores all tasks created by users, and tasks are auto-expired based on their TTL value.

### 2. **Lambda Function**
- **Runtime**: Python 3.12
- **Handler**: `main.handler`
- **Code**: The function code is located in the `task-manager-api/app` folder.
- **Environment Variables**:
  - `TABLE_NAME`: The name of the DynamoDB table.

The Lambda function handles all CRUD operations (Create, Read, Update, Delete) for tasks stored in DynamoDB.

### 3. **Lambda Layer**
- **Layer Name**: `MyLayer`
- **Content**: The layer includes external libraries used by the Lambda function, packaged as a `.zip` file (`layer_content.zip`).
  
This layer provides reusable dependencies to the Lambda function.

### 4. **Lambda Function URL**
The Lambda function is exposed via a **Function URL**, allowing it to be accessed over HTTP without the need for API Gateway.

- **Authentication**: None (public access for simplicity).
- **CORS Configuration**: Allows all origins, methods, and headers.

## Deployment

Follow these steps to deploy the infrastructure:

1. **Install Dependencies**:
   First, install the required dependencies by running:

   ```bash
   npm install
   ```

2. **Bootstrap AWS Environment**:
   If this is your first time using AWS CDK in your account, you will need to bootstrap your environment:

   ```bash
   cdk bootstrap
   ```

3. **Deploy the Stack**:
   Deploy the CDK stack to AWS:

   ```bash
   cdk deploy
   ```

   After deployment, the Lambda Function URL will be output to the console.

## Local Development

To test the Lambda function locally, you can use tools such as **AWS SAM CLI** or **LocalStack**.

## Usage

Once deployed, the infrastructure enables the following features:

1. **Create, Read, Update, Delete (CRUD) Tasks**: The Lambda function communicates with DynamoDB to perform CRUD operations on tasks.
2. **Query Tasks by User**: Using the global secondary index (`user_index`), tasks can be queried by the `user_id` and sorted by `created_time`.
3. **Task Expiry**: Tasks are automatically removed after 24 hours, based on the `ttl` attribute.

## Cleanup

To remove the infrastructure from AWS, run:

```bash
cdk destroy
```

This will delete all the resources created by the CDK stack.

---
