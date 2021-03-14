import Task from './Task'
const Tasks = ({tasks, onDelete, onToggle,onUpdate}) => {
    return (
        <div>
            {tasks.map((task)=>(
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onUpdate={onUpdate}/>
            ))}
        </div>
    )
}

export default Tasks;