import React,{ Component} from 'react'


// {/* <Welcome name="Bruce Wayne" heroName="Batman"/> */}

class Welcome extends Component {
    render() { 
        const {name,heroName} = this.props
        return ( 
        <h1>
            Welcome {name} AKA {heroName}
        </h1> );
    }
}
 
export default Welcome;