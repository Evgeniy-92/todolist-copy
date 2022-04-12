import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./AddItemForms.module.css";

export type AddItemFormsPropsType = {
    addItem: (title: string) => void
}

export function AddItemForms(props: AddItemFormsPropsType) {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string>('')
    const changeNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError('')
    }
    const addItemHandler = () => {
        if (newTitle.trim() === '') {
            setError('Field is required')
            return
        }
        props.addItem(newTitle)
        setNewTitle('')
    }
    const onEnterAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.code === 'Enter') {
            addItemHandler()
        }
    }
    return (
        <div>
            <input
                value={newTitle}
                onChange={changeNewTitleHandler}
                onKeyPress={onEnterAddTaskHandler}
                type="text"
                className={error ? style.error : ''}
            />
            <button onClick={addItemHandler}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
    )
}