import React from 'react'

function NavBar({setPage}) {
    return (
        <nav>
            <button onClick={()=> setPage('planet')} >Planets</button>
            <button onClick={()=> setPage('people')} >People</button>
        </nav>
    )
}

export default NavBar
