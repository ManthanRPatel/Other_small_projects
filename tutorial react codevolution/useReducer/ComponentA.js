import React,{ useContext } from 'react'
import { CountContext } from './App2'

function ComponentA() {

    const countContext = useContext(CountContext);

    return (
        <div>
            <h1>Component A ={countContext.countState}</h1>
            <button onClick={()=>countContext.countDispatch('increment')} >Increament</button>
            <button onClick={()=>countContext.countDispatch('decremant')} >Decreament</button>
            <button onClick={()=>countContext.countDispatch('reset')} >Reset</button>
        </div>
    )
}

export default ComponentA
