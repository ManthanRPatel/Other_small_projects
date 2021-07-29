import React, { Component } from 'react'

 class ClickCounter2 extends Component {
     
    render() {
        const { count , increamentCount } = this.props
        return (
            <div>
                <button onClick={increamentCount}>click {count} Times</button>
            </div>
        )
    }
}

export default ClickCounter2
