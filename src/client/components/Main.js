import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card';

export default function Main() {
    const userEndpoint = 'http://localhost:5000/api/users';
    const transactionEndpoint = 'http://localhost:5000/api/transactions'
    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState('');
    const [createUserID, setCreateUserID] = useState('');
    const [depositUserId, setDepositUserID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [transactionUserID, setTransactionUserID] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [change, setChange] = useState(0);
    const [transferUserIDFrom, setTranferUserIDFrom] = useState('');
    const [transferUserIDTo, setTranferUserIDTo] = useState('');
    const [transferAmount, setTranferAmount] = useState('');
    const userIDChange = (e) => {
        setUserID(e.target.value)
    }
    const userEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const userNameChange = (e) => {
        setName(e.target.value)
    }
    const createUserIDChange = (e) => {
        setCreateUserID(e.target.value)
    }
    const transactionUserIDChange = (e) => {
        setTransactionUserID(e.target.value)
    }

    const transferUserIDFromChange = (e) => {
        setTranferUserIDFrom(e.target.value)
    }
    const transferUserIDToChange = (e) => {
        setTranferUserIDTo(e.target.value)
    }
    const transferAmountChange = (e) => {
        setTranferAmount(e.target.value)
    }

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
    const createUser = async (e) => {
        e.preventDefault()
        try {
            axios.post(`${userEndpoint}`, {
                name: name,
                email: email,
                userID: createUserID
            }).then((response) => {
                console.log(response.data)
                setChange(change + 1)
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
    const getUserTransactionsById = async () => {
        try {
            if (transactionUserID) {
                const response = await axios.get(`${transactionEndpoint}/getUserTransactionsById/${transactionUserID}`)
                console.log(response.data)
                setTransactions(response.data)
            }
            else {
                console.log("please input an ID")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const transfer = async () => {
        try {
            axios.put(`${transactionEndpoint}/transferCash`, {
                fromUser: transferUserIDFrom,
                toUser: transferUserIDTo,
                amount: transferAmount
            }).then((response) => {
                console.log(response.data)
                setChange(change + 1)
            }).catch((error) => {
                console.log(error)
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get(`${userEndpoint}`)
            console.log(response.data)
            setUsers(response.data)
        }
        getUsers();
    }, [change])
    return (
        <div className="mainContainer">
            <h2>Users</h2>
            <div className="cardContainer">
                {users && users.map((u, index) => {
                    return <Card key={index}
                        name={u.name} email={u.email} id={u.userID}
                        cash={u.details.cash} credit={u.details.credit} />
                })}
            </div>
            <label>search user ID:</label>
            <input type="text" value={userID} onChange={(e) => userIDChange(e)} />
            <button onClick={getUsersById}>getUsersById</button><br/><br/>

            <h2>Add User</h2><br/>
            <form>
                <label>User Name:</label>
                <input type="text" value={name} required onChange={(e) => userNameChange(e)} />
                <label>User Email:</label>
                <input type="text" value={email} required onChange={(e) => userEmailChange(e)} />
                <label>User ID:</label>
                <input type="text" value={createUserID} required onChange={(e) => createUserIDChange(e)} />
                <input type="submit" value="add user" onClick={(e) => createUser(e)} />
            </form><br/><br/>

            <h2>Transfer</h2><br/>
            <label>From User ID:</label>
            <input type="text" value={transferUserIDFrom} onChange={(e) => transferUserIDFromChange(e)} />
            <label>To User ID:</label>
            <input type="text" value={transferUserIDTo} onChange={(e) => transferUserIDToChange(e)} />
            <label>Amount:</label>
            <input type="text" value={transferAmount} onChange={(e) => transferAmountChange(e)} />
            <button onClick={transfer}>Transfer</button><br/><br/>
            
            <h2>Get User Transactions</h2><br/>
            <label>search user ID:</label>
            <input type="text" value={transactionUserID} onChange={(e) => transactionUserIDChange(e)} />
            <button onClick={getUserTransactionsById}>get user transaction</button>
            <table>
                <thead>
                    <tr>
                        <th>from user</th>
                        <th>to user</th>
                        <th>transaction type</th>
                        <th>amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map((t, index) => {
                        return (
                            <tr key={index}>
                                <td>{t.fromUser}</td>
                                <td>{t.toUser}</td>
                                <td>{t.transactionType}</td>
                                <td>{t.amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

