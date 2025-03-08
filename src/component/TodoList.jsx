import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Todo from "./Todo";
import { useContext } from "react";
import { TodosContext } from "../context/todoContext";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect , useMemo} from "react";

export default function TodoList() {
  const { array, setArray } = useContext(TodosContext);
  const [displayedArrayType , setDisplayedArrayType ]= useState("all")
  const [input, setInput] = useState("");



  const completedTodos = useMemo(() => {
    return array.filter((t)=>{
      return t.isComplated
    })
  })
   


  const notCompletedTodos = useMemo(() => {
    return array.filter((t) => !t.isComplated);
    })
 

 
  let todosToBeRenderd =array

  if(displayedArrayType == "complated"){
    todosToBeRenderd = completedTodos
  }
  else if(displayedArrayType == "non-complated"){
    todosToBeRenderd = notCompletedTodos
  }
  else{
    todosToBeRenderd = array
  }


  const todoJsx = todosToBeRenderd.map((t) => {
    return <Todo todo={t} key={t.id} />;
  });

  

  
 
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("todos")) ??[];
    setArray(getData);
  }, []);

  function handelClick() {
    const newAraay = {
      id: uuidv4(),
      title: input,
      details: "",
      isComplated: false,
    };

    const updatedTodos = [...array, newAraay];
    setArray(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInput("");
  }


 

  function changeDisplayedType(e){
    setDisplayedArrayType(e.target.value)
  }





  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275,  maxHeight:"85vh" , overflow:"scroll"}}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontWeight: "900" }}>
            مهامي
          </Typography>

          <Divider />

          <ToggleButtonGroup
            color="primary"
            style={{ direction: "ltr", marginTop: "30px"  }}
            value={displayedArrayType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
          >
            <ToggleButton value="non-complated" >المهام الغير مكتملة</ToggleButton>
            <ToggleButton value="complated">المهام المكتملة</ToggleButton>
            <ToggleButton value="all">جميع المهام</ToggleButton>
          </ToggleButtonGroup>

          {todoJsx}

          <Grid container marginBottom={0} marginTop={3} spacing={2}>
            <Grid
              size={8}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TextField
                value={input}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={(e) => setInput(e.target.value)}
              />
            </Grid>

            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ width: "100%", height: "100%",  }}
                variant="contained"
                onClick={handelClick}
                disabled={input.length == 0}
              >
                اضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
