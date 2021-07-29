import React, { Component } from 'react'
import LifecycleB from './LifecycleB'


{/* <LifecycleA /> */}

export class LifecycleA extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             name: 'Manthan'
        }
        console.log("LifecycleA constructor")
    }

    changeState = ( ) => {
        this.setState({
            name: 'Macmax'
        })
    }

    static getDerivedStateFromProps( props , state ){
        console.log("LifecycleA static getderived state from props")
        return null;
    }

    componentDidMount( ){
        console.log("LifecycleA component did mount")
    }

    shouldComponentUpdate(){
        console.log("LifecycleA shouldComponentUpdate")
        return true
    }

    getSnapshotBeforeUpdate(prevProps ,prevState ){
        console.log("LifecycleA  getSnapshotBeforeUpdate");
        return null
    }
    
    componentDidUpdate( ){
        console.log("LifecycleA componentDidUpdate")
    }

    render() {
        console.log("Lifecycle A render")
        return (
            <div>
                LifeCycleA
                <button onClick={this.changeState} >Change</button>
                <LifecycleB />
            </div>
        )
    }
}

export default LifecycleA
