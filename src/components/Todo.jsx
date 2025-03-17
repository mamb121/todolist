import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";

export default function Todo({ todo }) {
  const {todos,setTodos}  = useContext(TodosContext)
  
  function handleCheckClick(){
    const updatedTodos = todos.map((t)=>{
      if(t.id == todo.id){
        t.isCompleted = !t.isCompleted       
      }
      return t;     
    })
    setTodos(updatedTodos);    
  }
  return (
    <Card
      className="todoCard"
      sx={{
        minWidth: 275,
        background: "#283593",
        color: "white",
        marginTop: 5,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ textAlign: "right" }}>
              {todo.title}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "right" }}>
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
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
