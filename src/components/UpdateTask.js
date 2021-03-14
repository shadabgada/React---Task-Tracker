import {useState} from 'react'

const UpdateTask= ({updateTask,updateTaskValue,onUpdate})=>{

//useState is React Hook
    const [id, setId] = useState(updateTaskValue.id)
    const [text, setText] = useState(updateTaskValue.text)
    const [day, setDay] = useState(updateTaskValue.day)
    const [reminder, setReminder] = useState(updateTaskValue.reminder)
    const [doc_id, setDoc_id] = useState(updateTaskValue.doc_id)

    const onSubmit = (e) =>{
        e.preventDefault()

        if(!text){
            alert('Please enter text')
            return
        }
        if(!day){
            alert('Please enter day and time')
            return
        }

        updateTask({id,text,day,reminder,doc_id});
        
        //This function is to hide the form on save
        onUpdate()
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' 
                placeholder='Add Task'
                value={text}
                onChange={(e)=>setText(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type="datetime-local"  
                placeholder='Date & Time'
                value={day}
                onChange={(e)=>setDay(e.target.value)}
                />
            </div>
            <div className='form-control form-control-check'>
                <label> Set Reminder</label>
                <input type='checkbox'
                value={reminder}
                checked={reminder}
                onChange={(e)=>setReminder(e.currentTarget.checked)}/>
            </div>

            <input type='submit' value='Update Task' className='btn btn-block' />
        </form>
    )
}

export default UpdateTask;