import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Main() {
    const endpoint = 'http://localhost:5000/api/users'
    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState('');
    const [createUserID, setCreateUserID] = useState('');
    const [depositUserId,setDepositUserID] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const getUsersById = async () => {
        try {
            if (userID) {
                const response = await axios.get(`http://localhost:5000/api/users/findById/${userID}`)
                console.log(response.data)
            }
            else {
                console.log("please input an ID")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const userIDChange = (e) => {
        setUserID(e.target.value)
        console.log(userID)
    }
    const userEmailChange = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }
    const userNameChange = (e) => {
        setName(e.target.value)
        console.log(name)
    }
    const createUserIDChange = (e) => {
        setCreateUserID(e.target.value)
        console.log(createUserID)
    }

    const createUser = async (e) => {

        e.preventDefault()
        try {
            axios.post('http://localhost:5000/api/users/', {
                name: name,
                email: email,
                userID: createUserID
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    const depositCashById = async () => {
        axios.put(`http://localhost:5000/api/users/depositCash/${depositUserID}`, {
          amount: depositAmount
        }).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      }
    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get(`${endpoint}`)
            console.log(response.data)
            setUsers(response.data)
        }
        getUsers();
    }, [])
    return (
        <div>
            <label>search user ID:</label>
            <input type="text" value={userID} onChange={(e) => userIDChange(e)} />
            <button onClick={getUsersById}>getUsersById</button>
            <h1>add user</h1>
            <form>
                <label>user name:</label>
                <input type="text" value={name} onChange={(e) => userNameChange(e)} />
                <label>user email:</label>
                <input type="text" value={email} onChange={(e) => userEmailChange(e)} />
                <label>user ID:</label>
                <input type="text" value={createUserID} required onChange={(e) => createUserIDChange(e)} />
                <input type="submit" value="add user" onClick={(e) => createUser(e)} />
                {/* <button onClick={(e) => createUser(e)}>add user</button> */}
            </form>
        </div>
    )
}

