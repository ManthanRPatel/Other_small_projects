import React, { Component } from 'react';


{/* <Message /> */}

class Message extends Component {
    constructor(){
        super();
        this.state = {
            message : 'Welcome visitor,,,,....'
        }
    }
    changeMessage = ()=>{
        if( this.state.message === "Welcome visitor,,,,...." ){
            this.setState({message:'Thanks for subscribe,...'})
        }
        else{
            this.setState({message:'Welcome visitor,,,,....'});
        }
        
    }
    render() { 
        return ( 
            <div>
                <h1>
                    {this.state.message}
                </h1>
                <button onClick={ ()=>{  this.changeMessage() } } 
                    className="btn btn-success">subscribe!!!</button>
            </div>
         );
    }
}
 
export default Message;