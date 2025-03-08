import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useContext, useState } from "react";
import { TodosContext } from "../context/todoContext";

export default function Todo({ todo }) {
  const [updateTodo, setUpdateTodo] = useState({ title: "", details: "" });
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const { array, setArray } = useContext(TodosContext);

  function handleCheckClick() {
    const updateTodos = array.map((t) => {
      if (t.id == todo.id) {
        return { ...t, isComplated: !t.isComplated };
      }
      return t;
    });

    setArray(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  function handleDeleteClick() {
    setShowDelete(true);
  }

  function handelClose() {
    setShowDelete(false);
  }

  function handleDeleteConfirm() {
    const deleteTodos = array.filter((t) => {
      return t.id != todo.id;
    });
    setArray(deleteTodos);
    localStorage.setItem("todos", JSON.stringify(deleteTodos));
  }

  function handelUpdateClose() {
    setShowUpdate(false);
  }

  function handleUpdateConfirm() {
    const updateConfirmTodos = array.map((t) => {
      if (t.id == todo.id) {
        return {...t, title: updateTodo.title, details: updateTodo.details };
      }
      return t;
    });

    setArray(updateConfirmTodos);
    setShowUpdate(false);
    localStorage.setItem("todos", JSON.stringify(updateConfirmTodos));
  }


  function handleUpdateClick() {
    setUpdateTodo({ title: todo.title, details: todo.details }); // تعيين القيم الحالية
    setShowUpdate(true);
  }

  

  return (
    <>
      <Dialog
        sx={{ direction: "rtl" }}
        onClose={handelClose}
        open={showDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelClose}>اغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        sx={{ direction: "rtl" }}
        onClose={handelClose}
        open={showUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelUpdateClose}>اغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        className="todocard"
        sx={{ minWidth: 275,  color: "white", marginTop: 5, background: todo.isComplated ?"#009688" :"#c0ca33"  }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5" sx={{ textAlign: "right" }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleCheckClick}
                className="iconButton"
                aria-label="check"
                sx={{
                  color: todo.isComplated ? "white" : "#009688",
                  background: todo.isComplated ? "#009688" : "white",
                  border: "solid #009688 3px",
                  padding: 1,
                  minWidth: 40,
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="edit"
                sx={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                  padding: 1,
                  minWidth: 40,
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                aria-label="delete"
                sx={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                  padding: 1,
                  minWidth: 40,
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </>
              );
            }
