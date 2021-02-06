import { FaTimes } from 'react-icons/fa';
//Parameter should be in curly braces
const Task = ({task,onDelete,onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder':''}`}  onDoubleClick={()=>onToggle(task.id)}>
            <h3>
                {task.text}
                <FaTimes style={{color:'red', cursor:'pointer'}} onClick={()=>onDelete(task.id)}/>
            </h3>
            <p>{task.day}</p>
         </div>
    )
}

//className='task reminder'
//This will apply both classes .task and .task.reminder

// onClick={onDelete}   => passes default id

//To Pass id value explicitly use following syntax (arrow function)
//onClick={()=>onDelete(task.id)}


export default Task;