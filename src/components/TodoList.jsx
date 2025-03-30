import { useEffect, useState,useMemo } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";

//Components
import Todo from "./Todo";

//DIALOGS IMPORTS
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// OTHERS
import {useTodos,useTodosDispatch} from "../contexts/TodosContext";
import { useToast } from './../contexts/ToastContext';
import createCache from '@emotion/cache';


export default function TodoList() {
  
  const todos = useTodos();
  const dispatch  = useTodosDispatch();
  //const [todos,dispatch] = useReducer(todoReducer,[])
  const { showHideToast } = useToast()
  const [showDeleteDialog,setShowDeleteDialog]  = useState(false)
  const [showEditDialog,setShowEditDialog]  = useState(false)  
  const [dialogTodo,setDialogTodo] = useState(null)
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");


	// filteration arrays

	const completedTodos = useMemo(() => {
		return todos.filter((t) => {
			console.log("calling completed todos");
			return t.isCompleted;
		});
	}, [todos]);

	const notCompletedTodos = useMemo(() => {
		return todos.filter((t) => {
			console.log("calling not completed todos");
			return !t.isCompleted;
		});
	}, [todos]);

	let todosToBeRendered = todos;

  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "not-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
		dispatch({ type: "get" });
	}, []);

  // ===== HANDLERS
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    dispatch({type:"added", payload:{newTitle:titleInput}})
    setTitleInput("");
    showHideToast("تمت الإضافة بنجاح");
  }






  //========== EVENT HANDLERS=============
    //======= NEW HANDLERS=============
    function openDeleteDialog(todo){      
      setDialogTodo(todo)
      setShowDeleteDialog(true)
    }
    
    function openEditDialog(todo){      
      setDialogTodo(todo)
      setShowEditDialog(true)
      
    }

  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} showDelete={openDeleteDialog} showEdit={openEditDialog} checkClick ={handleCheckClick} />;
  });
    //======= NEW HANDLERS=============
  function handleCheckClick(todo){
    dispatch({type:"toggledCompleted",payload:todo})    
    showHideToast("تم التعديل بنجاح ");     
    setShowDeleteDialog(false)
  }

  function handleDeleteClick(){
    setShowDeleteDialog(true)
  }

  function handleDeleteClose(){
    alert("handleDeleteClose")
    setShowDeleteDialog(false)
  }
  function handleDeleteConfirm(){
    dispatch({type:"deleted", payload:{id:dialogTodo.id}})
    setShowDeleteDialog(false)
    showHideToast("تم حذف المهمة ");       
  }

  function handleEditClick(){
    setShowEditDialog(true)
  }
  function handleEditClose(){    
    setShowEditDialog(false)
  }
  function handleEditConfirm(){
    dispatch({type:"updated",payload:{dialogTodo}})
    setShowEditDialog(false);  
    showHideToast("تم التعديل على المهمة ");       
  }
  //========== EVENT HANDLERS=============
  return (
    <>
    <div dir="rtl">
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
            value={dialogTodo?.title}
            onChange={(e)=>{
              setDialogTodo({...dialogTodo,title: e.target.value,})
            }}
          />
          <TextField
            margin="dense"
            id="TodoDetails"
            name="TodoDetails"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"            
            value={dialogTodo?.details}
            onChange={(e)=>{
              setDialogTodo({...dialogTodo,details: e.target.value})
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
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} style={{minWidth: "500px",maxHeight: "80vh", overflow:"scroll"}}>
          <CardContent>
            <Typography gutterBottom variant="h1" style={{ fontWeight: "bold" }}>
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              color="primary"
              exclusive
              aria-label="Platform"
              style={{ marginTop: "30px" }}
              value={displayedTodosType}
              onChange={changeDisplayedType}
            >
              <ToggleButton value="all">الكل</ToggleButton>
              <ToggleButton value="completed">منجز</ToggleButton>
              <ToggleButton value="not-completed">غير منجز</ToggleButton>
            </ToggleButtonGroup>
            {todosJsx}
            {/*==== INPUT + ADD =====*/}
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid item xs={8}>
              <div dir="rtl">
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  style={{ width: "100%",textAlign:"right"}}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}                
                />
                </div>
              </Grid>
              <Grid container item xs={4}>
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.length == 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
    </>
  );
}
