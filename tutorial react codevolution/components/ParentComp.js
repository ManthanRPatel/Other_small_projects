import React, { Component } from 'react'
import RegulerComp from './RegulerComp'
import PureComp from './PureComp'
import MemoComp from './MemoComp'


{/* <ParentComp /> */}

class ParentComp extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             name: 'macmax'
        }
    }

    // componentDidMount(){
    //     setInterval(()=>{
    //         this.setState({  name: 'macmax'  })
    //     },3000)
    // }

    render() {
        console.log("###### Parent Component render #######")
        return (
            <div>
                Parent Component
                <MemoComp name={this.state.name} />
                {/* <RegulerComp name={this.state.name} /> */}
                {/* <PureComp name={this.state.name}  /> */}
            </div>
        )
    }
}

export default ParentComp
