import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";

const initalTodos = [
  {
    id: uuidv4(),
    title: "title a",
    details: "detailssfdsd ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "title n",
    details: "detailsrer ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "titles",
    details: "detailsdd",
    isCompleted: false,
  },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initalTodos);
  const [titleInput, setTitleInput] = useState("");

  function handleCheckClick(todoId){
    const updatedTodos = todos.map((t)=>{
      if(t.id == todoId){
        t.isCompleted = !t.isCompleted       
      }
      return t;     
    })
    setTodos(updatedTodos);    
  }

  const todosJsx = todos.map((t) => {
    return <Todo key={t.id} todo={t} handleCheck={handleCheckClick} />;
  });

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitleInput("")
  }
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
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
          >
            <ToggleButton value="web">الكل</ToggleButton>
            <ToggleButton value="android">منجز</ToggleButton>
            <ToggleButton value="ios">غير منجز</ToggleButton>
          </ToggleButtonGroup>
          {todosJsx}
          {/*==== INPUT + ADD =====*/}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                style={{ width: "100%" }}
                value={titleInput}
                onChange={(e)=> setTitleInput(e.target.value)}
              />
            </Grid>
            <Grid container item xs={4}>
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {
                  handleAddClick();
                }}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
