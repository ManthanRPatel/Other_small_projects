import React, { Component } from 'react'

// {/* <ClassClick /> */}

export class ClassClick extends Component {

    clickHander = ()=>{
        console.log("click by button,,...")
    }

    render() {
        return (
            <div>
                <button onClick={this.clickHander} className="btn btn-success">Click ME!!!!</button>
            </div>
        )
    }
}

export default ClassClick
