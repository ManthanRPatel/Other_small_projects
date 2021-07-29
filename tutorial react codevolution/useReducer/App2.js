import React, { useReducer } from 'react';
import ComponentA from './ComponentA';
import ComponentC from './ComponentC';


{/* <App2 /> */}

export const CountContext = React.createContext();

const initialState = 0
const reducer = (state, action) => {
    switch(action){
        case 'increment':
            return state+1;
        case 'decremant':
            return state-1;
        case 'reset':
            return initialState;
        default:
            return state;
    }
}



export function App2(){
	const [count, dispatch] = useReducer(reducer, initialState)
	return (
		<div className='App'>
			<CountContext.Provider value={{ countState:count , countDispatch:dispatch }}>
				<h2>Count == {count}</h2>
				<ComponentA />
				<ComponentC />
			</CountContext.Provider>
			<br /><br /><br /><br />
			<br /><br /><br /><br />
		</div>
	)
}