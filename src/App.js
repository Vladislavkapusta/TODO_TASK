import { useEffect, useState } from 'react';
import { Context } from './context/Context';
import './App.css'
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';


function App() {

  let data = [
    {id: 1, title: 'Задача 1', completed: true},
    {id: 2, title: 'Задача 2', completed: false},
    {id: 3, title: 'Задача 3', completed: true},
  ]

const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) ?? data)



function removeTodo(id){
  let removedTasks = todos.filter((elem=>elem.id != id))
  setTodos(removedTasks)
}

function changeTodo(id){
  let changedTasks = todos.map(elem=>{
    if (elem.id === id){
      elem.completed = !elem.completed
    }
    return elem
  })
  setTodos(changedTasks)
}

function addNewTodo(title){
  let newTodo = {
    id: Date.now(),
    completed: false,
    title: title
  }
  setTodos([...todos, newTodo])
}

// useEffect(()=>{
//   let LD = JSON.parse(localStorage.getItem('todos'))
//   if(LD){
//       setTodos(JSON.parse(LD))
//   }

// },[])

useEffect(()=>{
localStorage.setItem('todos', JSON.stringify(todos))
},[todos])

  return (
    <Context.Provider value = {{removeTodo, changeTodo}}>    <div>
      <AddTodo addNewTodo={addNewTodo}/>
      <TodoList todos={todos}/>
    </div>
    </Context.Provider>

  );
}

export default App;
