import React from 'react';

//new component should be name WithCoponent

const withCounter = ( WrappedComponent , increamentNumber ) =>{
    class NewComponent extends React.Component{

        constructor(props) {
            super(props)
        
            this.state = {
                 count: 0
            }
        }
    
        increamentCount = () =>{
            this.setState( prevState =>{
                return { count : prevState.count + increamentNumber }
            } )
        }

        render(){
            return <WrappedComponent 
            count={this.state.count}
             increamentCount={this.increamentCount} 
             {...this.props} />
        }

    }

    return NewComponent;
}

export default withCounter;