import React,{useState , useEffect} from 'react'

{/* <IntervalHookCounter /> */}

function IntervalHookCounter() {

    const [count, setCount] = useState(0)

    useEffect(() => {
        const interval = setInterval(tick ,  2000);
        return(()=>{
            clearInterval(interval);
        })
    },[count])


    const tick = ()=>{
        setCount(prevCount => prevCount +1 )
    }

    return (
        <div>
            <h3>{count}</h3> 
        </div>
    )
}

export default IntervalHookCounter
