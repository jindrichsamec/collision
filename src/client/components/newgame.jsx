import React from 'react'
import Router from 'react-router'
import {Link} from 'react-router'
import $ from 'jquery'

export default React.createClass({

	mixins: [ Router.Navigation ],

	getInitialState() {
		return {gameId: null}
	},

	componentDidMount() {
		// @todo Make something better like this: https://github.com/rackt/react-router/blob/master/examples/partial-app-loading/app.js
		$.get('/api/new-game', function(result) {
			if (this.isMounted()) {
				this.setState({gameId: result.gameId});
				this.replaceWith('connect', {hash: result.gameId});
			}
		}.bind(this));
	},

	render() {
		var link;
		if (this.state.gameId) {
			link = <Link to="game" params={{"hash": this.state.gameId}}>{this.state.gameId}</Link>
		}

		return (
			<div>Loading...{link}</div>
		);
	}

});