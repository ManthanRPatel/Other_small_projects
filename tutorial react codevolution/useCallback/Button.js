import React, { children } from 'react'

function Button(props) {
    console.log('Rerender Button compo ==>',props.children)
    return (
        <div>
            <button onClick={props.handleClick}>
                {props.children}
            </button>
        </div>
    )
}

export default React.memo(Button);
