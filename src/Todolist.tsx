import React from "react";
import {taskType} from "./App";

type TodolistProps = {
    title: string
    tasks: Array<taskType>
}
export function Todolist({title, tasks}: TodolistProps) {

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={tasks[0].isDone}/>{tasks[0].taskName}</li>
                <li><input type="checkbox" checked={tasks[1].isDone}/>{tasks[1].taskName}</li>
                <li><input type="checkbox" checked={tasks[2].isDone}/>{tasks[2].taskName}</li>
            </ul>
        </div>
    )
}