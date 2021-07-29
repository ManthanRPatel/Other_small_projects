import React, { Component } from 'react';
import "./App.css";
// import MainApp from './OwnerCRUD/MainApp';
import MainApp from './progressiveApp/MainApp';
// import MainApp from './InfiniteScroll/MainApp';



class App extends Component {
	render() { 
		return ( 
			<>
				<MainApp />
			</>
		 );
	}
}
 
export default App;