import React,{ useContext } from 'react'
import ComponentE from './ComponentE'
import { UserContext , ChannelContext  } from '../App.js'


// in app.js
//
// export const UserContext = React.createContext()
// export const ChannelContext = React.createContext()
//
// <UserContext.Provider value={'Manthan'} >
// 					<ChannelContext.Provider value={'Macmax'} >
// 						<ComponentF />
// 					</ChannelContext.Provider>
// 				</UserContext.Provider>

function ComponentF() {

    const user =  useContext(UserContext);
    const channel = useContext(ChannelContext);

    return (
        <div>
            {user} ==> {channel}
            <ComponentE />
        </div>
    )
}

export default ComponentF
