import React from 'react';
import './App.css';
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./state/store";
import {addTodoListAC} from "./state/todoList-reducer";
import {AddItemForm} from "./components/AddItemForm";
import {TodoList} from "./components/TodoList";

export type FilterValuesType = "all" | "completed" | "active"
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  const dispatch = useDispatch()
  const todoLists = useSelector<RootState, TodoListType[]>(state => state.todoLists)

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolists
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem"
      }}>
        <div>
          <h3>
            Add new TodoList
          </h3>
          <AddItemForm addItem={(title: string) => dispatch(addTodoListAC(title))} maxInputLength={15}/>
        </div>
        <Grid container spacing={2}>
          {
            todoLists.map(todoList =>
              <Grid item xs={3} key={todoList.id}>
                <Paper style={{padding: "0.5rem 1rem"}}>
                  <TodoList
                    todoListId={todoList.id}
                    title={todoList.title}
                    filter={todoList.filter}
                  />
                </Paper>
              </Grid>
            )
          }
        </Grid>
      </div>
    </div>
  )
}

export default App;