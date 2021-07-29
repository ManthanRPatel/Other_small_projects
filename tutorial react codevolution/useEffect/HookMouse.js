import React,{useState,useEffect} from 'react'

{/* <HookMouse /> */}

function HookMouse() {

    const [X, setX] = useState(0);
    const [Y, setY] = useState(0)

    const logMousePosition = (e) =>{
        console.log("log mouse called");
        setX(e.clientX)
        setY(e.clientY)
    }

    useEffect(() => {
        console.log("Use EFFect called");
        window.addEventListener('mousemove',logMousePosition)

        return(()=>{
            console.log("COmponent UnMouting COde");
            window.removeEventListener('mousemove',logMousePosition);
        })

    },[]) // for only compoenent did mount -- only execute on initial render

    return (
        <div>
            Hooks X = {X} & Y = {Y}
        </div>
    )
}

export default HookMouse
