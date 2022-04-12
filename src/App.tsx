import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForms} from "./AddItemFors/AddItemForms";

function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'completed'}
    ])

    const [tasks, setTasks] = useState<StateTaskType>({
        [todolistID1]: [
            {id: v1(), taskName: 'HTML', isDone: true},
            {id: v1(), taskName: 'JS', isDone: true},
            {id: v1(), taskName: 'React', isDone: false},
            {id: v1(), taskName: 'Redux', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), taskName: 'Milk', isDone: true},
            {id: v1(), taskName: 'Bread', isDone: true},
            {id: v1(), taskName: 'Coffee', isDone: false},
            {id: v1(), taskName: 'Tea', isDone: false},
        ]
    })
    const deleteTask = (taskID: string, todolistID: string) => {
        const filterTasks = tasks[todolistID].filter(el => el.id !== taskID)
        setTasks({...tasks, [todolistID]: filterTasks})
    }

    const addTask = (taskName: string, todolistID: string) => {
        const newTask: TaskType = {id: v1(), taskName, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeFilter = (filter: filterValuesType, todolistID: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    const changeStatus = (idTask: string, isDone: boolean, todolistID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === idTask ? {...t, isDone} : t)
        })
    }

    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }
    const addTodolist = (todolistName: string) => {
        const newTodolistID = v1()
        const newTodolist: TodolistType = {
            id: newTodolistID,
            title: todolistName,
            filter: 'all'
        }
        setTodolist([newTodolist, ...todolist])
        setTasks({...tasks, [newTodolistID]: []})
    }
    const changeTaskTitle = (newTaskName: string, taskID: string, todolistID: string) => {
        const changeTask = tasks[todolistID].map(t => t.id === taskID ? {...t, taskName: newTaskName} : t)
        setTasks({...tasks, [todolistID]: changeTask})
    }
    const changeTodolistTitle = (newTodolistTitle: string, todolistID: string) => {
        const changeTodolist = todolist.map(tl => tl.id === todolistID ? {...tl, title: newTodolistTitle} : tl)
        setTodolist(changeTodolist)
    }

    return (
        <div className="App">
            <AddItemForms addItem={addTodolist}/>
            <div className="todolist">
                {
                    todolist.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
                        }
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
                        }
                        return (
                            <Todolist
                                key={tl.id}
                                todolistID={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                deleteTask={deleteTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />

                        )
                    })
                }
            </div>
        </div>
    );
}


// type
export type TodolistType = {
    id: string
    title: string
    filter: filterValuesType
}
export type StateTaskType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    taskName: string
    isDone: boolean
}
export type filterValuesType = 'all' | 'completed' | 'active'
export default App;
