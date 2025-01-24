import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Tasks {
  [key: string]: Task[];
}

function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Tasks>(
    JSON.parse(localStorage.getItem("tasks") || "{}")
  );
  const [task, setTask] = useState<Task | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const foundTask = Object.keys(tasks)
      .map((key) => tasks[key])
      .flat()
      .find((task) => task.id === taskId);

    if (foundTask) {
      setTask(foundTask);
      setStatus(Object.keys(tasks).find((key) =>
        tasks[key].some((t) => t.id === taskId)
      ) || "");
    }
  }, [taskId, tasks]);

  const updateTask = () => {
    if (!task || !status) return;

    const updatedTasks = { ...tasks };
    const oldStatus = Object.keys(updatedTasks).find((key) =>
      updatedTasks[key].some((t) => t.id === taskId)
    );

    if (oldStatus) {
      updatedTasks[oldStatus] = updatedTasks[oldStatus].filter(
        (t) => t.id !== taskId
      );
    }

    updatedTasks[status] = [...updatedTasks[status], task];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  const deleteTask = () => {
    const updatedTasks = { ...tasks };

    Object.keys(updatedTasks).forEach((key) => {
      updatedTasks[key] = updatedTasks[key].filter((t) => t.id !== taskId);
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  if (!task) return <Typography>Task not found</Typography>;

  return (
    <Box sx={{ padding: 2 ,maxWidth: 400, margin: "0 auto",border:"1px solid #ccc",borderRadius:"5px"}}>
      <Typography variant="h5" gutterBottom>
        Edit Task
      </Typography>
      <TextField
        label="Title"
        value={task.title}
        onChange={(e) =>
          setTask((prev) => ({ ...prev!, title: e.target.value }))
        }
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        value={task.description}
        onChange={(e) =>
          setTask((prev) => ({ ...prev!, description: e.target.value }))
        }
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        {Object.keys(tasks).map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={updateTask}>
        Save
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ marginLeft: 2 }}
        onClick={deleteTask}
      >
        Delete
      </Button>
    </Box>
  );
}

export default TaskDetails;
