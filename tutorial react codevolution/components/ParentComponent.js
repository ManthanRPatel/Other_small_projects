import React, { Component } from 'react'
import ChildComponent from './ChildComponent'


{/* <ParentComponent /> */}

export class ParentComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             parentName : 'Manthan'
        }
        this.greetParent = this.greetParent.bind(this);
    }

    greetParent(childName){
        alert(`Hello ::: ${this.state.parentName} from ${childName}`);
    }
    

    render() {
        return (
            <div>
                <ChildComponent greetHandler={this.greetParent} />
            </div>
        )
    }
}

export default ParentComponent
