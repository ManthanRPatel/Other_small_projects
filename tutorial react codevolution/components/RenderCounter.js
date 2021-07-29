import React, { Component } from 'react'

/// or you can share it as childen instead of render prop

{/* <RenderCounter render={(count , increamentCount)=>  
    (<ClickCounter2 count={count} increamentCount={increamentCount} />)  } />
<RenderCounter render={(count , increamentCount)=>  
    (<HoverCounter2 count={count} increamentCount={increamentCount} />)  } /> */}


class RenderCounter extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             count:0
        }
    }

    increamentCount = () =>{
       this.setState(prevState => {
           return { count :prevState.count + 1 }
       })
    }

    render() {
        return (
            <div>
                {this.props.render(this.state.count , this.increamentCount)}
            </div>
        )
    }
}

export default RenderCounter
