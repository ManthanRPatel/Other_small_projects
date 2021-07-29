import React from 'react'

export default function ChildComponent(props) {
    return (
        <div>
            <button onClick={() => props.greetHandler('child') } className="btn btn-dark">Greet Parent</button>
        </div>
    )
}
