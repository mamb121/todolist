import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import TodosProvider from "./contexts/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ToastProvider } from "./contexts/ToastContext";

const initialTodos = [
	{
		id: uuidv4(),
		title: "قراءة كتاب",
		details: "تيسمبتيس يتسبميتس بيمستب",
		isCompleted: false,
	},
	{
		id: uuidv4(),
		title: "قراءة كتاب",
		details: "تيسمبتيس يتسبميتس بيمستب",
		isCompleted: false,
	},
	{
		id: uuidv4(),
		title: "قراءة كتاب",
		details: "تيسمبتيس يتسبميتس بيمستب",
		isCompleted: false,
	},
];

function App() {
	
  const [todos, setTodos] = useState(initialTodos);
  const theme = (outerTheme) =>
    createTheme({
      direction: "rtl",
      typography: {
        fontFamily: ["ReadexPro"],
      },
      palette: {
        primary: {
          main: "#004d40",
        },
      },
    });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

 
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>        
          <TodosProvider>
            <ToastProvider>
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
            </ToastProvider>
          </TodosProvider>        
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
