import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import TransitionsModal from "./Modal";
import { Task } from "../types/types";
import {GripVertical} from "lucide-react";

interface Tasks {
  [key: string]: Task[];
}

interface ColumnProps {
  column: string;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
       destinationColumn: string
  ) => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
       taskId: string,
       sourceColumn: string
  ) => void;
  newTaskTitle: string;
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  navigate: (path: string) => void;
  tasks: Tasks;
  addTask: (column: string,newTaskTitle: string,description: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onDragOver,
  onDrop,
  onDragStart,
  navigate,
  tasks,
  addTask
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      key={column}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column)}
      sx={{
        backgroundColor: "#f4f5f7",
        padding: 2,
        borderRadius: 2,
        minWidth: 300,
        maxWidth: 300,
        minHeight: 500,
        border: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          color="grey"
          sx={{
            padding: "5px",
            marginBottom: 2,
            backgroundColor:
              column == "Completed"
                ? "#d4edda"
                : column == "In progress"
                ? "#fff3cd"
                : "#fdced3",
          }}
        >
          {column}
        </Typography>
        <Typography color="grey" sx={{ padding: "2px", marginBottom: 2 }}>
          {tasks[column].length}
        </Typography>
      </Box>

      {tasks[column].map((task) => (
        <Card
          key={task.id}
          draggable
          onDragStart={(e) => onDragStart(e, task.id, column)}
          onClick={() => navigate(`/task/${task.id}`)}
          sx={{
            marginBottom: 2,
            cursor: "pointer",
            backgroundColor: "#fff",
            boxShadow: 1,
          }}
        >
          <CardContent sx={{display:"flex", justifyContent:"space-between",}}>
            <Typography variant="subtitle1">{task.title}</Typography>
            <Typography sx={{cursor:"grab",paddingX:"10px",":hover":{color:"red"}}}>
            <GripVertical  />
            </Typography>
          
          </CardContent>

        </Card>
      ))}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 1 }}
          onClick={() => handleOpen()}
        >
          Add Task
        </Button>
      </Box>

      <TransitionsModal column={column} addTask={addTask} open={open}  handleClose={handleClose}/>
    </Box>
  );
};

export default Column;
