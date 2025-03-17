import { Card, CardContent, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useContext,useState } from "react";
import { TodosContext } from "../contexts/TodosContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Directions } from "@mui/icons-material";

export default function Todo({ todo }) {
  const {todos,setTodos}  = useContext(TodosContext)
  const [showDeleteDialog,setShowDeleteDialog]  = useState(false)
  const [showEditDialog,setShowEditDialog]  = useState(false)
  const [updateTodo,setUpdateTodo]  = useState({title:todo.title,details:todo.details})
  const open = true

  //========== EVENT HANDLERS=============
  function handleCheckClick(){
    const updatedTodos = todos.map((t)=>{
      if(t.id == todo.id){
        t.isCompleted = !t.isCompleted       
      }
      return t;     
    })
    setTodos(updatedTodos);   
    localStorage.setItem("todos",JSON.stringify(updatedTodos)) 
  }

  function handleDeleteClick(){
    setShowDeleteDialog(true)
  }

  function handleDeleteClose(){
    setShowDeleteDialog(false)
  }
  function handleDeleteConfirm(){
    const DeletedTodos = todos.filter((t)=>{
      return t.id !== todo.id
    })
      setTodos(DeletedTodos);  
      localStorage.setItem("todos",JSON.stringify(DeletedTodos))  
  }

  function handleEditClick(){
    setShowEditDialog(true)
  }
  function handleEditClose(){
    setShowEditDialog(false)
  }
  function handleEditConfirm(){
    const updatedTodos = todos.map((t)=>{
      if(t.id == todo.id){
        t.title = updateTodo.title
        t.details = updateTodo.details
      }
      return t;     
    })
    setTodos(updatedTodos); 
    localStorage.setItem("todos",JSON.stringify(updatedTodos))
    setShowEditDialog(false);   
  }
  //========== EVENT HANDLERS=============

  return (
    <>
    {/*========= DELETE DIALOG =========*/}
    <Dialog
     dir="rtl"
    style={{ textAlign:"right"}}
    open={showDeleteDialog}
    onClose={handleDeleteClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      هل أنت متأكد من رغبتك في حذف هذه المهمة ؟
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        لايمكنك من التراجع عن الحذف بعد إتمامه
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDeleteClose}>إلغاء الأمر</Button>
      <Button  autoFocus onClick={handleDeleteConfirm}>
        نعم
      </Button>
    </DialogActions>
  </Dialog>
    {/*========= DELETE DIALOG =========*/}
    {/*========= EDIT DIALOG =========*/}
    <Dialog
     dir="rtl"
    style={{textAlign:"right"}}
    open={showEditDialog}
    onClose={handleEditClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      تعديل مهمة
    </DialogTitle>
    <DialogContent>
      <TextField
            autoFocus
            required
            margin="dense"
            id="TodoTitle"
            name="TodoTitle"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            style={{textAlign:"right"}}
            value={updateTodo.title}
            onChange={(e)=>{
              setUpdateTodo({...updateTodo,title: e.target.value})
            }}
          />
          <TextField
            margin="dense"
            id="TodoDetails"
            name="TodoDetails"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"            
            value={updateTodo.details}
            onChange={(e)=>{
              setUpdateTodo({...updateTodo,details: e.target.value})
            }}
          />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleEditClose}>إلغاء الأمر</Button>
      <Button  autoFocus onClick={handleEditConfirm}>
        حفظ
      </Button>
    </DialogActions>
  </Dialog>
    {/*========= EDIT DIALOG =========*/}

    <Card
      className="todoCard"
      sx={{
        minWidth: 275,
        background: "#283593",
        color: "white",
        marginTop: 5,
        textAlign:"left"
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ textAlign: "left" ,textDecoration: todo.isCompleted ? "line-through":"none" }}>
              {todo.title}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              {todo.details}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={4}
            display="flex"
            justifyContent="space-around"
            alignContent="center"
            justifyItems="center"
          >
            <IconButton
              className="IconButton"
              aria-label="Check"
              onClick={()=>handleCheckClick()}
              sx={{
                color: todo.isCompleted?"white":"#8bc34a",
                background: todo.isCompleted?"#8bc34a":"white",
                border: "solid #8bc34a 3px",
              }}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              className="IconButton"
              aria-label="Edit"
              sx={{
                color: "#8bc34a",
                background: "white",
                border: "solid #8bc34a 3px",
              }}
              onClick={handleEditClick}
            >
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              className="IconButton"
              aria-label="Delete"
              sx={{
                color: "#b23c17",
                background: "white",
                border: "solid #b23c17 3px",
              }}
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </>
  );
}
