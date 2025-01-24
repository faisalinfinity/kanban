import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
};

export default function TransitionsModal({
  open,
  addTask,
  handleClose,
  column,
}: {
  open: boolean;
  handleClose: () => void;
  addTask: (column: string, newTaskTitle: string, description: string) => void;
  column: string;
}) {


  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleTask = () => {
    if (!newTaskTitle.trim() || !description.trim()) return;

    addTask(column, newTaskTitle, description);

    setNewTaskTitle("");
    handleClose();
    setDescription("");
  };

  return (
    <div>
     
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              size="small"
              variant="outlined"
              label="New Task"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              fullWidth
            />
            <TextField
              size="small"
              variant="outlined"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 1 }}
              onClick={() => handleTask()}
            >
              Add Task
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
