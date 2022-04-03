import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolist, setTodolist] = useState<Array<todolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'completed'}
    ])

    const [tasks, setTasks] = useState({
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
        const newTask: taskType = {id: v1(), taskName, isDone: false }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeFilter = (filter: filterValuesType, todolistID: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    const changeStatus = (idTask: string, isDone: boolean, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === idTask ? {...t, isDone}: t)})
    }

    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    return (
        <div className="App">
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
                        />
                    )
                })
            }
        </div>
    );
}


// type
export type todolistType = {
    id: string
    title: string
    filter: filterValuesType
}
export type taskType = {
    id: string
    taskName: string
    isDone: boolean
}
export type filterValuesType = 'all' | 'completed' | 'active'
export default App;
