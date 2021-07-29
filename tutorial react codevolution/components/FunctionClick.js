import React from 'react'

// {/* <FunctionClick /> */}

function FunctionClick() {
    function clickHander(){
        console.log("Button clicked,,...")
    }
    return (
        <div>
            <button onClick={clickHander} className="btn btn-primary">CLICK</button>
        </div>
    )
}

export default FunctionClick