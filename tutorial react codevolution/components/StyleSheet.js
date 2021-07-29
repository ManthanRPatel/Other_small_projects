import React from 'react'
import './myStyles.css'

{/* <StyleSheet primary={true} /> */}

function StyleSheet(props) {

    let className = props.primary ? 'primary': '' 

    return (
        <div>
            <h1 className={`${className} font-xl`} >Style Sheets</h1>
        </div>
    )
}

export default StyleSheet
