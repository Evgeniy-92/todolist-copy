import React, {ChangeEvent} from "react";
import {filterValuesType, TaskType} from "../App";
import style from "./Todolist.module.css"
import {AddItemForms} from "../AddItemFors/AddItemForms";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TodolistProps = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskID: string, todolistID: string) => void
    changeFilter: (filter: filterValuesType, todolistID: string) => void
    addTask: (taskName: string, todolistID: string) => void
    changeStatus: (idTask: string, isDone: boolean, todolistID: string) => void
    filter: filterValuesType
    todolistID: string
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (newTaskName: string, taskID: string, todolistID: string) => void
    changeTodolistTitle: (newTodolistTitle: string, todolistID: string) => void
}
export function Todolist({title, tasks, deleteTask, changeFilter,
                             addTask, changeStatus, filter,
                             todolistID, removeTodolist, changeTaskTitle,
                             changeTodolistTitle}: TodolistProps) {
    const changeFilerOnOllHandler = () => {changeFilter('all', todolistID)}
    const changeFilerOnActiveHandler = () => {changeFilter('active', todolistID)}
    const changeFilerOnCompletedHandler = () => {changeFilter('completed', todolistID)}
    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }
    const addTaskHandler = (taskName: string) => {
        addTask(taskName, todolistID)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(newTitle, todolistID)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitleToState={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForms  addItem={addTaskHandler}/>
            <ul>
                {
                    tasks.map(el => {
                        const deleteTaskHandler = () => {
                            deleteTask(el.id, todolistID)
                        }
                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(el.id, e.currentTarget.checked, todolistID)
                        }
                        const changeTitleHandler = (newTitle: string) => {
                            changeTaskTitle(newTitle, el.id, todolistID)
                        }

                        return (
                            <li key={el.id} className={el.isDone ? style.taskCompleted : ''}>
                                <input
                                    type="checkbox"
                                    checked={el.isDone}
                                    onChange={changeStatusHandler}
                                />
                                <EditableSpan title={el.taskName} changeTitleToState={changeTitleHandler}/>
                                <button onClick={deleteTaskHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <button className={filter === 'all' ? style.filterActive : style.filter} onClick={changeFilerOnOllHandler}>All</button>
            <button className={filter === 'active' ? style.filterActive : style.filter} onClick={changeFilerOnActiveHandler}>Active</button>
            <button className={filter === 'completed' ? style.filterActive : style.filter} onClick={changeFilerOnCompletedHandler}>Completed</button>
        </div>
    )
}

