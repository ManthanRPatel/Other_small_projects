// import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import * as userActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Auth extends Component {
	state = {
		waitAuthCheck: true,
		bidBadge: 0,
	};

	componentDidMount() {
		return Promise.all([
			// Comment the lines which you do not use
		]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	render() {
		// return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
		return this.state.waitAuthCheck ? null : <React.Fragment children={this.props.children} />;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: userActions.logoutUser,
			setUserData: userActions.setUserData,
			showMessage: Actions.showMessage,
			hideMessage: Actions.hideMessage,
			appendNavigationItem: Actions.appendNavigationItem,
			resetNavigation: Actions.resetNavigation
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
