import React from 'react'
import Router from 'react-router'

export default React.createClass({

	mixins: [ Router.Navigation, Router.State ],

	handleSignin(e) {
		e.preventDefault();
		// @todo make this as "action"
		this.transitionTo('/game-pad/' + this.getParams().hash);
	},

	render() {
		return (
			<form onSubmit={this.handleSignin}>
				<div className="form-group">
					<label htmlFor="nick">Name or nickname</label>
					<input type="text" name="nick" className="form-control" />
				</div>
				<input type="submit" className="btn btn-primary" value="Connect" />
			</form>
		)
	}

});