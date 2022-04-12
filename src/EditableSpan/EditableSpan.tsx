import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from './EditableSpan.module.css'

export type EditableSpanPropsType = {
    title: string
    changeTitleToState: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const inputOn = () => {
        setEditMode(true)
    }
    const inputOff = () => {
        setEditMode(false)
        props.changeTitleToState(title)
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const EnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            inputOff()
        }
    }
    return (
        editMode
            ? <input
                autoFocus
                onBlur={inputOff}
                onKeyPress={EnterPressHandler}
                value={title}
                onChange={changeTitleHandler}
            />
            : <span onDoubleClick={inputOn}>{title}</span>
    )
}