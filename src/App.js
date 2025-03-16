import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Typography } from "@mui/material/Typography";

function App() {
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
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
