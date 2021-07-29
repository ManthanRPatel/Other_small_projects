import React, { useState , useMemo } from 'react'

{/* <Counter /> */}

function Counter() {

    const [counter1, setCounter1] = useState(0)
    const [counter2, setCounter2] = useState(0)

    const increamentOne = () =>{
        setCounter1(counter1 +1 )
    }
    const increamentTwo = () =>{
        setCounter2(counter2 +1 )
    }

    const isEven = useMemo(() =>{
        let i = 0
        while(i<20000000) i++
        return ( counter1 % 2 === 0 )
    } , [counter1])

    return (
        <div>
            <span>{ isEven ? 'Even':'Odd' }</span>
            <button onClick={increamentOne} >Counter One = {counter1 } </button>
            <button onClick={increamentTwo}  >Counter Two = {counter2 } </button>
        </div>
    )
}

export default Counter
