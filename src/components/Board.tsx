import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
} from "@mui/material";


import Column from "./Column";
import { Task, Tasks } from "../types/types";


const initialTasks: Tasks = {
  "Not started": [],
  "In progress": [],
  Completed: [],
};

function Board() {
  const [tasks, setTasks] = useState<Tasks>(
    JSON.parse(localStorage.getItem("tasks") || JSON.stringify(initialTasks))
  );
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (column: string,newTaskTitle: string,description: string) => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      description: description.trim(),
      
    };

    setTasks((prev) => ({
      ...prev,
      [column]: [...prev[column], newTask],
    }));
    // setNewTaskTitle("");
  };

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
    sourceColumn: string
  ) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const onDrop = (
    e: React.DragEvent<HTMLDivElement>,
    destinationColumn: string
  ) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (sourceColumn === destinationColumn) return;

    const sourceTasks = [...tasks[sourceColumn]];
    const destinationTasks = [...tasks[destinationColumn]];
    const taskIndex = sourceTasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) return;

    const [movedTask] = sourceTasks.splice(taskIndex, 1);
    destinationTasks.push(movedTask);

    setTasks({
      ...tasks,
      [sourceColumn]: sourceTasks,
      [destinationColumn]: destinationTasks,
    });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();



  return (
    <>
      <Typography sx={{ fontSize: 30, fontWeight: "bold", padding: 2 ,color: "teal"}}>
            Task Manager
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", padding: 2 }}>
      
      {Object.keys(tasks).map((column) => (
        <Column
          column={column}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragStart={onDragStart}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle}
          navigate={navigate}
          tasks={tasks}
          key={column}
          addTask={addTask}
        />
      ))}

    </Box>
    </>
    
  );
}

export default Board;
