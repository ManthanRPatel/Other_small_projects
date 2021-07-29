import React, { Component } from 'react'


// {/* <Counter addValue={2} /> */}

export class Counter extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             count : 0
        }
    }
    
    additon = () => {
        // this.setState({
        //     count : this.state.count+1
        // },()=>{ console.log("Callback value ::"+this.state.count)  });
        this.setState(
            (prevState, props) => ({ count:prevState.count + props.addValue  })
        )
        console.log(this.state.count);
    }

    additon5 = () => {
        this.additon();
        this.additon();
        this.additon();
        this.additon();
        this.additon();
    }

    render() {
        return (
            <div>
                <div>Count ::{this.state.count} </div>
                <button onClick={()=>{ this.additon5() } } >ADD</button>
            </div>
        )
    }
}

export default Counter
