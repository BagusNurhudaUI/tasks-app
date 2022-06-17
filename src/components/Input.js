import React, { useState } from "react";

export default function Input ({addTask}){
    const [value, setValue] = useState("")
    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('masuk ke onSubmit');
        console.log(value);
        if(value === ""){
            return console.log("Please add something to-do")
        }
        addTask(value)
        setValue('');
    }

    return (
        <div>
            <form className="add-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <label>Task</label>
                    <input type="text" placeholder="add task" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button onClick={onSubmit}>Create</button>
                </div>              
            </form>

        </div>
    )
}