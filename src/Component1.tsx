import React, {ChangeEvent, useState} from "react";

export type PropsType = {

}

export type UsersType = {
    [key: string]: {name: string, lastName: string}
}


export const Component1 = (props: PropsType) => {

    const [usersID, setUsersID] = useState([29,27])
    const [users, setUsers] = useState<UsersType>({
        '29': {name: 'Evgeniy', lastName: 'Drozd'},
        '27': {name: 'Karina', lastName: 'Drozd'},
    })
    const [nameValue, setNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [ageValue, setAgeValue] = useState<number>(0)

    const changeNameValue = (e: ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.currentTarget.value)
    }
    const changeLastNameValue = (e: ChangeEvent<HTMLInputElement>) => {
        setLastNameValue(e.currentTarget.value)
    }
    const changeAgeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setAgeValue(Number(e.currentTarget.value))
    }

    const addUser = () => {
        setUsersID([...usersID, ageValue])
        setUsers({...users, [ageValue]: {name: nameValue, lastName: lastNameValue}})
        setNameValue('')
        setLastNameValue('')
        setAgeValue(0)
    }
    const removeUser = (id: number) => {
        setUsersID(usersID.filter(u => u !== id))
        delete users[id]
        setUsers({...users})
    }
    const [initName, setInitName] = useState<number>(0)
    return (
        <div>
            <input type="text" placeholder={'name'} value={nameValue} onChange={changeNameValue}/>
            <input type="text" placeholder={'last name'} value={lastNameValue} onChange={changeLastNameValue}/>
            <input type="number" value={ageValue} onChange={changeAgeValue}/>
            <button onClick={addUser}>Add</button>
            {usersID.map(u => {
                const userName = initName !== u ? <span onClick={() => setInitName(u)}>{users[u].name}</span>: <input onBlur={() => setInitName(0)} type="text"/>
                return (
                    <h2 key={u}>
                        <div>User ID: <span>{u}</span> Name: {userName}</div>
                        <button onClick={() => removeUser(u)}>X</button>
                    </h2>
                )
            })}
        </div>
    )
}


