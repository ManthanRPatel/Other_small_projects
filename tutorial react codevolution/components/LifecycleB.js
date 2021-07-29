import React, { Component } from 'react'

export class LifecycleB extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             name: 'Manthan'
        }
        console.log("LifecycleB constructor")
    }

    static getDerivedStateFromProps( props , state ){
        console.log("LifecycleB static getderived state from props")
        return null;
    }

    componentDidMount( ){
        console.log("LifecycleB component did mount")
    }

    shouldComponentUpdate(){
        console.log("LifecycleB shouldComponentUpdate")
        return true
    }

    getSnapshotBeforeUpdate(prevProps ,prevState ){
        console.log("LifecycleB  getSnapshotBeforeUpdate");
        return null;
    }
    
    componentDidUpdate( ){
        console.log("LifecycleB componentDidUpdate")
    }
    

    render() {
        console.log("LifecycleB render")
        return (
            <div>
                LifeCycleB
            </div>
        )
    }
}

export default LifecycleB
