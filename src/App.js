import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Header from './Components/Header'
import { useState,useEffect } from 'react'
import Tasks from './Components/Tasks'
import TaskForm from './Components/TaskForm'
import Footer from './Components/Footer'
import About from './Components/About'

function App() {
  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks,setTasks] = useState([])


  useEffect(()=>{
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  },[])

  //fetchTasks
  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    // console.log(data)
    return data
  }

  
  // const addTask = (task)=>{
  //   const id = Math.floor(Math.random() * 10000) + 1
  //   const newTask = {id, ...task}
  //   setTasks([...tasks,newTask])
  //   // console.log(task)
  // }

  const addTask = async (task)=>{
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks,data])
  }

  // const deleteTask = (id)=>{
  //   setTasks(tasks.filter((task)=>task.id !==id))
  //   // console.log('delete', id)
  // }
  const deleteTask = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    setTasks(tasks.filter((task)=>task.id !==id))
    
  }

  // const toggleReminder = (id)=>{
  //   setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: !task.reminder}: task))
  // }


  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    // console.log(data)
    return data
  }

  const toggleReminder = async (id)=>{
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: data.reminder}: task))
  }

  return (
    <Router>
    <div className='container'>
      <Routes>
        <Route exact path='/' element={
          <>
            <Header onAdd={ () => setShowAddTask(!showAddTask) } showAdd={showAddTask}/>
            {showAddTask && <TaskForm onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>: 'No Tasks yet'}
          </>
        } />
        <Route exact path='/about' element={<About />} />
      </Routes>
      <Footer />

    </div>
    </Router>
  )
}

export default App

