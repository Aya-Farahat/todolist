import TodoList from "./component/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./context/todoContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";


const theme = createTheme({
  typography: {
    fontFamily: ["Fustat2"],
  },
  palette:{
    primary:{
      main:"#009688"
    }
    ,secondary: {
      main: "#64ffda",
    },
  }

});


const todos = [
  {
    id: uuidv4(),
    title: "fff",
    details: "iiidddddddddddi",
    isComplated: false,
  },
  {
    id: uuidv4(),
    title: "fff",
    details: "iiirrrrrrrrri",
    isComplated: false,
  },
  {
    id: uuidv4(),
    title: "fff",
    details: "iiiittttttttttttt",
    isComplated: false,
  },
];

function App() {
  const [array, setArray] = useState(todos);

  

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#e0f2f1",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider  value={{array ,  setArray}}>
        <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
