import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType, taskType} from "./App";

type TodolistProps = {
    title: string
    tasks: Array<taskType>
    deleteTask: (taskID: string) => void
    changeFilter: (filter: filterValuesType) => void
    addTask: (taskName: string) => void
    changeStatus: (idTask: string, isDone: boolean) => void
}
export function Todolist({title, tasks, deleteTask, changeFilter, addTask, changeStatus}: TodolistProps) {
    const [newTaskName, setNewTaskName] = useState('')
    const [error, setError] = useState('')

    const changeFilerOnOllHandler = () => {changeFilter('all')}
    const changeFilerOnActiveHandler = () => {changeFilter('active')}
    const changeFilerOnCompletedHandler = () => {changeFilter('completed')}
    const changeNewTaskNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(e.currentTarget.value)
        setError('')
    }
    const addTaskHandler = () => {
        if (newTaskName.trim() === '') {
            setError('Field is required')
            return
        }
        addTask(newTaskName.trim())
        setNewTaskName('')
    }
    const onEnterAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.code === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskName}
                    onChange={changeNewTaskNameHandler}
                    onKeyPress={onEnterAddTaskHandler}
                    type="text"
                    className={error ? 'error': ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className='errorMessage'>{error}</div>}
            </div>
            <ul>
                {
                    tasks.map(el => {
                        const deleteTaskHandler = () => {
                            deleteTask(el.id)
                        }
                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(el.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={el.id}>
                                <input
                                    type="checkbox"
                                    checked={el.isDone}
                                    onChange={changeStatusHandler}
                                />{el.taskName}
                                <button onClick={deleteTaskHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={changeFilerOnOllHandler}>All</button>
            <button onClick={changeFilerOnActiveHandler}>Active</button>
            <button onClick={changeFilerOnCompletedHandler}>Completed</button>
        </div>
    )
}