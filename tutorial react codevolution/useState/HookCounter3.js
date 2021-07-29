import React,{ useState } from 'react'


{/* <HookCounter3 /> */}

function HookCounter3() {

    const [name, setName] = useState({firstName : '', lastName : '' });

    return (
        <div>
            <input type="text" value={name.firstName} onChange={(e)=> setName({...name ,firstName: e.target.value }) } />
            <input type="text" value={name.lastName} onChange={(e)=> setName({...name , lastName: e.target.value }) }  />
            <h2>Your firstName : { name.firstName }  ,   lastName : { name.lastName }  </h2>
            <h1> {JSON.stringify(name) } </h1>
        </div>
    )
}

export default HookCounter3
