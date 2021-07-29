import React, { Component } from 'react';
import "./App.css";
// import Greet from './components/Greet';
// import Welcome from './components/Welcome'
import Message from './components/Message'
import ParentComponent from './components/ParentComponent'
import NameList from './components/NameList'
import StyleSheet from './components/StyleSheet'
import Inline from './components/Inline'
import './components/appStyles.css'
import styles from './components/appStyles.module.css'



class App extends Component {
	render() { 
		return ( 
			<div className="App">
				<Inline />
				<h1 className="error">error</h1>
				<h1 className={styles.success}>success</h1>
				<StyleSheet primary={true} />
				<br /><br /><br /><br />
				<Message /><br /><br /><br /><br />
				<NameList />
				{/* <UserGreeting /> */}
				<br /><br /><br /><br />
				<ParentComponent />
				<br /><br /><br /><br />
				{/* <FunctionClick /> */}
				{/* <EventBind /> */}
				{/* <ClassClick /> */}
				{/* <Counter addValue={2} /> */}
				<br /><br /><br /><br />
				{/* <Greet name="Bruce Wayne" heroName="Batman" /> */}
				{/* <Welcome name="Bruce Wayne" heroName="Batman"/> */}
			</div>
		 );
	}
}
 
export default App;