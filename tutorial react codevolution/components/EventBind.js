import React, { Component } from 'react'

// {/* <EventBind /> */}

class EventBind extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             messge: 'Hello'
        }
        // this.clickHandler = this.clickHandler.bind(this);
    }
    
    clickHandler = () => {
        this.setState({
            messge:'GoodBye,...'
        })
        console.log(this)

    }


    render() {
        return (
            <div>
                <div>{ this.state.messge }</div>
                {/* <button onClick={()=> this.clickHandler()   } >Button!!!!!</button> */}
                {/* <button onClick={this.clickHandler.bind(this)} >Button!!!!!</button> */}
                <button onClick={this.clickHandler} >Button!!!!!</button>
            </div>
        )
    }
}

export default EventBind
