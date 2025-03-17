import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TodosContext } from "./contexts/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

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

function App() {
    const [todos, setTodos] = useState(initalTodos);
  
  const theme = createTheme({
    typography: {
      fontFamily: ["ReadexPro"],
    },
  });

  return (
    
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          direction: "rtl",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#191b1f",
        }}
      >
        <TodosContext.Provider value ={{todos,setTodos}}>
            <TodoList />
          </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
