import { useState } from 'react';
import {useEffect} from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import firebase from 'firebase'

import Button from '@material-ui/core/Button';

import db from "./firebase";
import UpdateTask from './components/UpdateTask';
const App = () =>{

  //This syntax is used for state management (Here, its Global State)
  // First value contains key value pair.

  //Second parameter is the dependency
  //If it is [], then useEffect is called only when page loads/refreshes
  //If we have some values then it gets called every time that parameter changes
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    //This method gets data from local json server
    //getTasks()

    db.collection('tasks').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTasks(snapshot.docs.map(doc=>({...doc.data(),doc_id:doc.id})))
    })

    var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

    console.log(dateTime)
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
  const deleteTask = async (doc_id) =>{

    db.collection('tasks').doc(doc_id.toString()).delete()
    setTasks(tasks.filter((task)=>task.doc_id !==doc_id))
    console.log('delete',doc_id)
  }


//Toggle reminder
const onToggle = async (doc_id)=>{

   const reminder = await db.collection("tasks").doc(doc_id.toString()).get().then(documentSnapshot => {
    return documentSnapshot.data().reminder;
  });

  db.collection("tasks").doc(doc_id.toString()).set({
    reminder: !reminder,
  },{merge:true})

  console.log(reminder)
}

//Update task
const updateTask = async(task)=>{
  db.collection("tasks").doc(task.doc_id).set({
    id:task.id,
    text: task.text,
    day: task.day,
    reminder: task.reminder,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  },{merge:true})
}

//Add Task
const addTask = async (task)=>{
    const id =Math.floor(Math.random()*1000)+1

  //  const newTask = {id, ...task}


  //Adds the record to Firebase
  db.collection('tasks').add({
    id:id,
    text: task.text,
    day: task.day,
    reminder: task.reminder,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })

  setTasks([...tasks,task])
  
}

//Show Form boolean variable
//In ternary operations, after question mark use ()
// For ex: true?():()
//{showAddTask?(<AddTask addTask={addTask}/>):('No Form')}
const [showAddTask, setShowAddTask] =useState(false)
const onAdd = () =>{
  setShowAddTask(!showAddTask)
} 

const [updateTaskValue, setUpdateTaskValue] = useState({})


const [showUpdateTask, setShowUpdateTask] =useState(false)
const onUpdate = (task) =>{
  setShowUpdateTask(!showUpdateTask)
  setUpdateTaskValue(task)
  console.log(task)
} 


  return (
    <div className="container">

      <Header onAdd={onAdd} showAdd={showAddTask}/>

      {showAddTask && <AddTask addTask={addTask} onAdd={onAdd}/>}


      {showUpdateTask && <UpdateTask updateTask={updateTask} updateTaskValue={updateTaskValue} onUpdate={onUpdate} />}


      {tasks.length>0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={onToggle} onUpdate={onUpdate}/>):('No Tasks to show')}

      {/* 
      Material UI button
      <br></br>
      <Button variant="contained" color="primary">
         Primary
      </Button> */}
    </div>
  );
}

export default App;
