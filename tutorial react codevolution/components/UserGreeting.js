import React, { Component } from 'react'


// {/* <UserGreeting /> */}

export class UserGreeting extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isLoggedIn : true

        }
    }
    
    render() {

        return this.state.isLoggedIn && <div>Welcome Manthan</div> //shortcircuit operator

        // return (
        //     this.state.isLoggedIn ? 
        //     (<h1>Welcome Macmax</h1> ):
        //     (<h2>Welcome Guest</h2>)
        // ) // ternory operator

        // let message
        // if( this.state.isLoggedIn ){
        //     message = <h1>Hello Manthan</h1>
        // }else{
        //     message = <div>Hello Guest</div>
        // }
        // return(
        // <div>
        //     {message}
        // </div>  ) // if esle operator



        // if( this.state.isLoggedIn ){
        //     return(
        //         <h1>Welcome Macmax</h1>
        //     )
        // }else{
        //     return(
        //         <div>Welcome guest</div>
        //     )
        // } // if esle operator


    }
}

export default UserGreeting
