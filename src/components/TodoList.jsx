import React, { useState } from 'react';
import "./Toto.css"

const TodoList = () => {
  const initialTasks = [
    { id: 1, name: 'Task 1', description: 'Description 1', completed: false },
    { id: 2, name: 'Task 2', description: 'Description 2', completed: false },
    { id: 3, name: 'Task 3', description: 'Description 3', completed: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const [currentTask, setCurrentTask] = useState({ id: null, name: '', description: '', completed: false });

  const [filter, setFilter] = useState('all');
  

  const handleEditClick = (task) => {
    setCurrentTask(task);
  };

  const handleToggleComplete = (taskId, isCompleted) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // logic input 
  
  const handleFormSubmit = (event) => {

    event.preventDefault();

    if (currentTask.id) {
      // Update task
      const updatedTasks = tasks.map(task => 
        task.id === currentTask.id ? currentTask : task
      );
      setTasks(updatedTasks);
    }
     
    else {
      // Create new task
      const newTaskWithId = { ...currentTask, id: tasks.length + 1 };
      setTasks([...tasks, newTaskWithId]);
    }

    setCurrentTask({ id: null, name: '', description: '', completed: false }); // Reset form

  };



  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'not_completed') return !task.completed;
    return true;
  });


  return (

    <div className='container'>
      <h1 className="text-center mt-3" >My todo</h1>


      <h2 className=" mt-5 " >{currentTask.id ? '' : ''}</h2>

      <form className=" mt-5 " onSubmit={handleFormSubmit}>
      <div className="row text-center">
      <div className="col-md-4">
        <input 
          type="text" 
          value={currentTask.name} 
          onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })}
          placeholder="Task Name"
           className=" mt-1  w-75 "
        />
        </div>
        <div className="col-md-4">
        <input 
          type="text" 
          value={currentTask.description} 
          onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
          placeholder="Task Description"
           className=" mt-1 mb-1  w-75 "
        />
        </div>
        <div className="col-md-4">
        <button className="btn btn-success   p-1 w-50 " type="submit">{currentTask.id ? 'Update' : 'Create'}</button>
      </div>
      </div>
      </form>

      <div className="row  mt-5">
        <div className="col-md-6 text-start">
          <strong>My Todos</strong>
        </div>

      <div className="col-md-6  text-md-end" >
        <strong>Status Filter : </strong>
        <select className='colorred' onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not_completed"  >Not Completed</option>
        </select>
      </div>
      </div>



      <div className="row text-center mt-5 content" >
        {filteredTasks.map(task => (
          <div key={task.id} className="col-md-4 text-start box   "   >
           <p> <strong> Name : {task.name}</strong></p> 
           <p><strong> Description :  {task.description}</strong></p>
            
           <p><strong>Status <select className='colorred'
              value={task.completed ? 'completed' : 'not_completed'}
              onChange={(e) => handleToggleComplete(task.id, e.target.value === 'completed')}>
              <option value="not_completed"  >Not Completed</option>
              <option value="completed">Completed</option>
            </select>
            </strong></p>

            <button className="btn btn-success h1 m-1 " onClick={() => handleEditClick(task)}>Edit</button>
            <button className="btn btn-danger h1 m-1"  onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
    </div>


   
    </div>


  );
};

export default TodoList;
