import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <div>
            <ul>
                <Link to='/about' >
                    <li><h2>About</h2></li>
                </Link>
                <Link to='/shoppage' >
                    <li><h2>Shop</h2></li>
                </Link>
            </ul>
        </div>
    )
}

export default Nav
