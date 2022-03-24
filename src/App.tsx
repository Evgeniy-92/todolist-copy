import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {

    const [tasks, setTasks] = useState<Array<taskType>>([
        {id: v1(), taskName: 'HTML', isDone: true},
        {id: v1(), taskName: 'JS', isDone: true},
        {id: v1(), taskName: 'React', isDone: false},
        {id: v1(), taskName: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<filterValuesType>('all')

    const deleteTask = (taskID: string) => {
        const filterTasks = tasks.filter(el => el.id !== taskID)
        setTasks(filterTasks)
    }
    const addTask = (taskName: string) => {
        const newTask: taskType = {id: v1(), taskName, isDone: false }
        setTasks([newTask, ...tasks])
    }
    const changeFilter = (filter: filterValuesType) => {
        setFilter(filter)
    }

    const changeStatus = (idTask: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === idTask ? {...t, isDone}: t))
    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
    }
    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                deleteTask={deleteTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
            />
        </div>
    );
}


// type
export type taskType = {
    id: string
    taskName: string
    isDone: boolean
}
export type filterValuesType = 'all' | 'completed' | 'active'
export default App;
