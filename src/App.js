import { useState } from 'react';
import {useEffect} from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import firebase from 'firebase'

import Button from '@material-ui/core/Button';

import db from "./firebase";

const App = () =>{

  //This syntax is used for state management (Here, its Global State)
  // First value contains key value pair.

  //Second parameter is the dependency
  //If it is [], then useEffect is called only when page loads/refreshes
  //If we have some values then its gets called every time that parameter changes
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    //This method gets data from local json server
    //getTasks()

    db.collection('tasks').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTasks(snapshot.docs.map(doc=>doc.data()))
    })

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

//Update
// const updateTask = async(task)=>{
//   db.collection("tasks").doc(doc_id).set({
//     id:id,
//     text: task.text,
//     day: task.day,
//     reminder: task.reminder,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//   },{merge:true})


//Add Task
const addTask = async (task)=>{
    const id =Math.floor(Math.random()*1000)+1

  //  const newTask = {id, ...task}

  const res = await fetch(`http://localhost:5000/tasks`,{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  })

  const data = await res.json();

  //Adds the record to Firebase
  db.collection('tasks').add({
    id:id,
    text: task.text,
    day: task.day,
    reminder: task.reminder,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })

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

      <br></br>
      <Button variant="contained" color="primary">
         Primary
      </Button>
    </div>
  );
}

export default App;
