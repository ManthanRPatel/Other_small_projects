import React, { Component } from 'react'

export class RegulerComp extends Component {
    render() {
        console.log("Reguler Component render")
        return (
            <div>
                Reguler Component {this.props.name}
            </div>
        )
    }
}

export default RegulerComp
