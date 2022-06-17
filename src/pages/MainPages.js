import React,{ useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { v4 as uuidv4 } from 'uuid';
import Input from '../components/Input';
import Header from '../components/Header';
import Items from '../components/Items';

export default function MainPage (){
    const [loading, setloading] = useState(true); 
    const [value, setValue] = useState("")   
    const [tasks, setTasks] = useState([]); 

    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 1000);
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        if(value === ""){
            prompt("masukkan teks task yang ingin ditulis");
            return 
        }
        addTask(value)
    }

    const addTask = (task) => {
        const newtask = [...tasks, { task, complete: false }];
        setTasks(newtask);
        setValue("")
    }

    const deleteTask = (index)=> {
        const newtask = [...tasks]
        let hasilprompt =  prompt("Are you sure you want to delete?");
        if(hasilprompt===null){
            return;
        }
        newtask.splice(index, 1)
        setTasks(newtask);
    }

    const completeTask = (index) => {
        const newtask = [...tasks];
        newtask[index].complete === false ?
        (newtask[index].complete = true) :
        (newtask[index].complete = false)
        setTasks(newtask);
    }

    const updateTask = (index) => {
        const tempTask = [...tasks]
        const task = tempTask[index];

        let newtask = prompt("Update your task !", task.task);
        if(newtask ===null){
            return
        }
        let obj = {task: newtask, complete: false}
        tempTask.splice(index, 1, obj);
        setTasks(tempTask);
    }

    // useEffect((index) => {
    //     completeTask(index);
    // },[])

    return (
        <div className="bg-gray-100">
            {loading ? 
            <Loading />
            :
            <div className="bg-gray-100 h-full min-h-screen min-w-1/2 m-auto">
                <Header />
                <div className= "pt-5 container m-auto">
                    <div className="p-5">
                            <p>Selamat datang di Aplikasi do your task!</p>
                    </div>
                    <div className=''>
                        <form className="add-form " onSubmit={onSubmit}>
                            <div className="form-control">
                                <input type="text" className="w-1/2" placeholder="silahkan tambahkan task baru" value={value} onChange={(e) => setValue(e.target.value)} />
                                <button onClick={onSubmit} className="align-text-top pl-2 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-7 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                </button>
                            </div>              
                        </form>
                    </div>    
                    <div className="relative overflow-x-auto  sm:rounded-lg p-10">
                    
                        <table className="w-full text-sm  text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 items-center text-left">
                                    Task
                                    </th>
                                    <th scope="col" className="px-6 py-3 w-1/5">
                                    <span className="">Settings</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" max-h-72 overflow-auto">
                        
                            {tasks[0] === undefined ? 
                            <div>Anda belum memiliki tugas apapun</div>
                            :
                            tasks.map((item, index) => (
                            <tr className="bg-white border-b max-w-full">
                                <th
                                scope="row"
                                className={` text-left px-6 py-4 font-medium text-gray-900  whitespace-wrap flex-wrap ${item.complete ? "bg-green-100" : "bg-red-100"}`}
                                >
                                {item.task}
                                </th>
                                <td className="px-6 py-4 text-center flex justify-center gap-4 items-center">
                                <a
                                    onClick={() => completeTask(index)}
                                    className="font-medium  hover:underline cursor-pointer text-center"
                                >
                                    {item.complete=== false? 
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                                    
                                    
                                   
                                </a>
                                <a
                                    onClick={() => updateTask(index)}
                                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </a>
                                <a
                                    onClick={() => {deleteTask(index)}}
                                    className="font-medium text-red-600 hover:underline cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    
                    </div>

                </div>
            </div>  
            }
        </div>
    )
}