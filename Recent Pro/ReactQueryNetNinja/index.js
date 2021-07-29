import React,{ useState } from 'react'
import NavBar from './components/NavBar'
import Planets from './components/Planets'
import People from './components/People'
import './MainApp.css'

function MainApp() {

    const [page, setPage] = useState('planet')

    return (
        <div >
            <h1>Star Wars Info</h1>
            <NavBar setPage={setPage} />
            <div className="content  block" >
                { page === 'planet' ?  <Planets /> : <People />  }
            </div>
        </div>
    )
}

export default MainApp
