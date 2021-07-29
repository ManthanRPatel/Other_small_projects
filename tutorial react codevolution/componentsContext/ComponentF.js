import React, { Component } from 'react'
import ComponentE from './ComponentE'
import UserContext from './userContext'


{/* <UserProvider value="Macmax">
    <ComponentF />
</UserProvider> */}


class ComponentF extends Component {

    static contextType = UserContext;
    
    render() {
        return (
            <div>
                <h2> Component F context {this.context} </h2>
                <ComponentE />
            </div>
        )
    }
}

// ComponentF.contextType = UserContext; or using---- static contextType = UserContext;

export default ComponentF
