import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const [tasks, setTasks] = useState<Array<taskType>>([
        {id: 1, taskName: 'HTML', isDone: true},
        {id: 2, taskName: 'JS', isDone: true},
        {id: 3, taskName: 'React', isDone: false},
        {id: 4, taskName: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<filterValuesType>('all')

    const deleteTaskHandler = (taskID: number) => {
        const filterTasks = tasks.filter(el => el.id !== taskID)
        setTasks(filterTasks)
    }
    const changeFilter = (filter: filterValuesType) => {
        setFilter(filter)
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
                deleteTaskHandler={deleteTaskHandler}
                changeFilter={changeFilter}
            />
        </div>
    );
}


// type
export type taskType = {
    id: number
    taskName: string
    isDone: boolean
}
export type filterValuesType = 'all' | 'completed' | 'active'
export default App;
