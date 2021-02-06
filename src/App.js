import { useState } from 'react';
import {useEffect} from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () =>{

  //This syntax is used for state management (Here, its Global State)
  // First value contains key value pair.
  //Second is the function which can be used to change states values
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

//Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data)
    return data
  }

//Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  console.log(data)
  return data
}


//Delete Task
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })

    setTasks(tasks.filter((task)=>task.id !==id))
    console.log('delete',id)
  }


//Toggle reminder
const onToggle = async (id)=>{

  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle,reminder:!taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(updTask)
  })


  setTasks(tasks.map((task)=>task.id===id?{...task, reminder:!task.reminder}:task))
  console.log(id)
}


//Add Task
const addTask = async (task)=>{
  //  const id =Math.floor(Math.random()*1000)+1

  //  const newTask = {id, ...task}

  const res = await fetch(`http://localhost:5000/tasks`,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  })

  const data = await res.json();
  setTasks([...tasks,data])
}

//Show Form boolean variable
//In ternary operations, after question mark use ()
// For ex: true?():()
//{showAddTask?(<AddTask addTask={addTask}/>):('No Form')}
const [showAddTask, setShowAddTask] =useState(false)


const onAdd = () =>{
  setShowAddTask(!showAddTask)
} 

  return (
    <div className="container">
      <Header onAdd={onAdd} showAdd={showAddTask}/>

      {showAddTask && <AddTask addTask={addTask}/>}

      {tasks.length>0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={onToggle}/>):('No Tasks to show')}
    </div>
  );
}

export default App;
