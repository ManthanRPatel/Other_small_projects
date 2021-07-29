import React,{ useState } from 'react'


{/* <HookCounter2 /> */}


function HookCounter2() {

    const initialCount = 0
    const [count, setCount] = useState(initialCount)

    const incrementFive = () =>{
        for(let i=0; i <5 ; i++){
            setCount( prevCount => prevCount +1)
        }
    }

    return (
        <div>
            <h1>Count : </h1><h2>{count}</h2><br />
            <button onClick={()=> setCount(initialCount) } >Reset</button>
            <button onClick={()=> setCount( prevCount => prevCount +1 ) } >Increament</button>
            <button onClick={()=> setCount( prevCount => prevCount -1 ) } >Decreament</button>
            <button onClick={incrementFive } >5 Increament</button>
        </div>
    )
}

export default HookCounter2
