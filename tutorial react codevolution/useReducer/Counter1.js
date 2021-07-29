import React,{useReducer} from 'react'


{/* <Counter1 /> */}

const initialState = 0
const reducer = (state, action) => {
    switch(action){
        case 'increment':
            return state+1;
        case 'decremant':
            return state-1;
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

function Counter1() {

    const [count, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            <h1>Count = {count} </h1>
            <button onClick={()=>dispatch('increment')} >Increament</button>
            <button onClick={()=>dispatch('decremant')} >Decreament</button>
            <button onClick={()=>dispatch('reset')} >Reset</button>
        </div>
    )
}

export default Counter1
