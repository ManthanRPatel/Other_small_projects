import React, { Component } from 'react'
import withCounter from './withCounter'

{/* <ClickCounter name="Manthan" />
<HoverCounter /> */}

class ClickCounter extends Component {
    
    render() {
        const {count, increamentCount} = this.props;
        return (
            <div>
                <button onClick={increamentCount}>{this.props.name} CLick {count} Times</button>
            </div>
        )
    }
}

export default withCounter(ClickCounter, 5);
