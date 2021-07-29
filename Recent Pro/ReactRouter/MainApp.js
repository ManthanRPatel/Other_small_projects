import React, { Component } from 'react';
import "./App.css";
// import MainApp from './OwnerCRUD/MainApp';
// import MainApp from './InfiniteScroll/MainApp';
import Nav from './ReactRouter/Nav'
import { BrowserRouter as Router ,Switch ,Link ,Route  } from 'react-router-dom'
import About from './ReactRouter/About';
import ShopPage from './ReactRouter/ShopPage';


class App extends Component {
	render() { 
		return ( 
			<Router>
				<Link to='/' >
					<h1>Main App...</h1>
				</Link>
					<Nav />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/about" component={About} />
						<Route path="/ShopPage" component={ShopPage} />
					</Switch>
			</Router>
		 );
	}
}

const Home = ()=>{
	return(
	<>
		Home
	</>
	)
}
 
export default App;