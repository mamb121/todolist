import { useContext, useEffect, useState } from "react";
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
import { TodosContext } from "../contexts/TodosContext";
import { v4 as uuidv4 } from "uuid";
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const nonCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;

  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "not-completed") {
    todosToBeRendered = nonCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  }, []);

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <div dir="rtl">
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }} style={{maxHeight: "80vh", overflow:"scroll"}}>
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
  );
}
