import React from 'react'

export default function Card(props) {
    return (
        <div className="card">
            <p>Name:{props.name}</p>
            <p>Email:{props.email}</p>
            <p>ID:{props.id}</p>
            <p>Balance:{props.cash}</p>
            <p>Credit:{props.credit}</p>
        </div>
    )
}
