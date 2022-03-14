import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const tasks1: Array<taskType> = [
        {id: 1, taskName: 'HTML', isDone: true},
        {id: 2, taskName: 'JS', isDone: true},
        {id: 3, taskName: 'React', isDone: false},
    ]
    const tasks2: Array<taskType> = [
        {id: 1, taskName: 'Spider man', isDone: true},
        {id: 2, taskName: 'Supernatural', isDone: false},
        {id: 3, taskName: 'Prison Break', isDone: true},
    ]
    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks1}/>
            <Todolist title='Films' tasks={tasks2}/>
        </div>
    );
}

// type
export type taskType = {
    id: number
    taskName: string
    isDone: boolean
}
export default App;
