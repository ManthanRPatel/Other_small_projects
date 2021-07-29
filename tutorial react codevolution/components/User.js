import React, { Component } from 'react'


{/* <ClickCounter2 />
<HoverCounter2 />
<User render={(isLoggedIn)=> isLoggedIn?"Manthan":"Guest" } /> */}

class User extends Component {
    render() {
        return (
            <div>
                {this.props.render( true )}
            </div>
        )
    }
}

export default User
