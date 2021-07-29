import React,{useReducer} from 'react'


{/* <Counter2 /> */}


const initialState = {
    firstCounter:0,
    secondCounter: 10
}
const reducer = (state, action) => {
    switch(action.type){
        case 'increment':
            return { ...state, firstCounter : state.firstCounter + action.value };
        case 'decremant':
            return { ...state,firstCounter : state.firstCounter -  action.value };
        case 'increment2':
            return { ...state,secondCounter : state.secondCounter + action.value };
        case 'decremant2':
            return { ...state,secondCounter : state.secondCounter -  action.value };
        case 'reset':
            return initialState;
        default:
            return initialState;
    }
}

function Counter2() {

    const [count, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            <h1>firstCounter = {count.firstCounter},,,, </h1>
            <h1>secondCounter = {count.secondCounter} </h1>
            <button onClick={()=>dispatch({type:'increment', value:1 })} >Increament</button>
            <button onClick={()=>dispatch({type:'decremant', value:1 })} >Decreament</button><br />
            <button onClick={()=>dispatch({type:'increment', value:3 })} >Increament 3</button>
            <button onClick={()=>dispatch({type:'decremant', value:3 })} >Decreament 3</button><br />
            <button onClick={()=>dispatch({type:'increment2', value:1 })} >second increment</button>
            <button onClick={()=>dispatch({type:'decremant2', value:1 })} >second decremant</button><br />
            <button onClick={()=>dispatch({type:'reset'})} >Reset</button>
        </div>
    )
}

export default Counter2
