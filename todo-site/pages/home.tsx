import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Task from "../components/task";
import TaskItem from "../components/taskItem";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from 'next/router';

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

const Home: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskContent, setNewTaskContent] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem('idToken')) {
      const idToken = sessionStorage.getItem('idToken')!;
      const idTokenDecoded = parseJwt(idToken);
      const usernameFromToken = idTokenDecoded['preferred_username'];
      setUsername(usernameFromToken);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/login');
  };

  const todoApiEndpoint = "https://tsgo2tt5n4hcvsbgmmzfvtxem40pdpmb.lambda-url.eu-west-3.on.aws";
  const userId = username;

  const getTasks = async () => {
    setIsLoading(true);
    try {
      console.log('Username:', username);
      const response = await fetch(`${todoApiEndpoint}/list_tasks/${userId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const responseData = await response.json();
      const tasks: Task[] = Array.isArray(responseData.tasks) ? responseData.tasks : [];
      setTasks(tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      getTasks();
    }
  }, [username]); // Ensure getTasks is called when username changes
  
  const putTask = async (task: Task) => {
    setTasks([task, ...tasks]);
    try {
      const response = await fetch(`${todoApiEndpoint}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const responseData = await response.json();
      const taskId: string = responseData.task_id;
      console.log(`Successfully put task: ${taskId}`);
      getTasks();
    } catch (error) {
      console.error('Failed to put task:', error);
    }
  };

  const deleteTask = async (taskId?: string) => {
    if (!taskId) return;
    const newTasks = tasks.filter((task) => task.task_id !== taskId);
    setTasks(newTasks);
    try {
      const response = await fetch(`${todoApiEndpoint}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      console.log('Task deleted:', taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(`${todoApiEndpoint}/tasks/${updatedTask.task_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const updatedTaskResponse = await response.json();
      console.log("Task updated:", updatedTaskResponse);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const addNewTask = async () => {
    const task: Task = {
      task_id: `task_${uuidv4()}`,
      user_id: userId,
      description: newTaskContent,
      completed: false,
    };
    setNewTaskContent("");
    await putTask(task);
  };

  const taskInputField = (
    <div className="flex mt-6">
      <input
        className="border border-gray-300 p-2 rounded-md grow mr-4"
        type="text"
        placeholder="Enter task here"
        value={newTaskContent}
        onChange={(e) => setNewTaskContent(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white w-24 p-2 rounded-md"
        onClick={addNewTask}
      >
        Add
      </button>
    </div>
  );

  const taskList = (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.task_id}
            {...task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );

  const loadingText = isLoading ? "Loading" : "Ready";
  const loadingTextColor = isLoading ? "text-orange-500" : "text-green-500";
  const loadingStatus = (
    <div className={`${loadingTextColor} text-center mb-4 text-sm`}>
      {loadingText}
    </div>
  );

  const userIdElement = (
    <div className="text-center text-gray-700">User ID: {userId}</div>
  );

  return (
    <div>
      <Head>
        <title>To-Do List App</title>
        <meta name="description" content="To-do list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold text-center">My Tasks</h1>
        <h1>Welcome, {username}!</h1>
        {userIdElement}
        {loadingStatus}
        {taskList}
        {taskInputField}
      </main>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
