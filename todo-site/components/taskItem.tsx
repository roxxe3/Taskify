import React from "react";
import Task from "./task";

interface TaskItemInterface extends Task {
  onDelete: (taskId?: string) => void;
  onUpdate: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemInterface> = (props) => {
  const [isDone, setIsDone] = React.useState(props.completed);

  const handleTaskUpdate = async () => {
    const newIsDoneValue = !isDone;
    setIsDone(!isDone);
    const updatedTask = {
      task_id: props.task_id,
      user_id: props.user_id,
      description: props.description,
      completed: newIsDoneValue,
    };
    props.onUpdate(updatedTask);
  };

  const taskStyle: string = isDone ? "text-gray-400 line-through" : "";

  // Create a task item with a check box.
  const taskItem = (
    <div className="border border-gray-300 rounded-md p-2 mb-2 flex items-center">
      <input
        type="checkbox"
        checked={isDone}
        onChange={handleTaskUpdate}
        className="mr-4"
      />
      <div className={`flex-1 ${taskStyle} font-medium text-lg`}>
        {props.description}
      </div>
      <button
        className="text-red-500 ml-4 font-medium hover:underline"
        onClick={() => {
          props.onDelete(props.task_id);
        }}
      >
        Delete
      </button>
    </div>
  );
  
 
  return taskItem;
};
export default TaskItem;
