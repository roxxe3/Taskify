from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional  # Add this line
import uuid
import time
import boto3
import os
from boto3.dynamodb.conditions import Key  # Add this line


router = APIRouter()


class TaskSchema(BaseModel):
    description: str
    completed: bool = False
    task_id: Optional[str] = None
    user_id: Optional[str] = None





@router.post("/tasks", response_model=TaskSchema)
async def create_task(task: TaskSchema):
    created_time = int(time.time())
    task_data = {
        'task_id' : f"task_{str(uuid.uuid4())}",
        'description' : task.description,
        'completed' : task.completed,
        'created_time' : created_time,
        'ttl' : int(created_time + 86400),
        'user_id' : task.user_id
    }   

    table = get_table()
    table.put_item(Item=task_data)


    return task_data

@router.get("/tasks/{task_id}")
async def get_task(task_id: str):
    table = get_table()
    task = table.get_item(Key={'task_id': task_id})
    if 'Item' not in task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/tasks/{task_id}")
async def update_task(task_id: str, task: TaskSchema):
    table = get_table()
    response = table.update_item(
        Key={"task_id": task_id},
        UpdateExpression="SET description = :description, completed = :completed",
        ExpressionAttributeValues={
            ":description": task.description,
            ":completed": task.completed,
        },
        ReturnValues="ALL_NEW"
        
    )
    updated_task = response.get('Attributes', {})
    return updated_task

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    table = get_table()
    table.delete_item(Key={'task_id': task_id})
    return "done"

@router.get("/list_tasks/{user_id}")
async def list_tasks(user_id: str):
    table = get_table()
    response = table.query(
        IndexName="user_index",
        KeyConditionExpression=Key("user_id").eq(user_id),
        ScanIndexForward=False,
        Limit=10,
    )
    tasks = response.get("Items")
    return {"tasks" : tasks}



def get_table():
    table_name = os.environ.get("TABLE_NAME")
    return boto3.resource('dynamodb').Table(table_name)