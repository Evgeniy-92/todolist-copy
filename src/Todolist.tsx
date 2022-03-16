import React from "react";
import {filterValuesType, taskType} from "./App";

type TodolistProps = {
    title: string
    tasks: Array<taskType>
    deleteTaskHandler: (taskID: number) => void
    changeFilter: (filter: filterValuesType) => void
}
export function Todolist({title, tasks, deleteTaskHandler, changeFilter}: TodolistProps) {

    const changeFilerHandlerAll = () => {changeFilter('all')}
    const changeFilerHandlerActive = () => {changeFilter('active')}
    const changeFilerHandlerCompleted = () => {changeFilter('completed')}

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map(el => <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>{el.taskName}
                        <button onClick={() => deleteTaskHandler(el.id)}>X</button>
                    </li>)
                }
            </ul>
            <button onClick={changeFilerHandlerAll}>All</button>
            <button onClick={changeFilerHandlerActive}>Active</button>
            <button onClick={changeFilerHandlerCompleted}>Completed</button>
        </div>
    )
}