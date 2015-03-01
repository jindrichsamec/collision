import React from 'react'
import {Link} from 'react-router'

export default React.createClass({

	render() {
		return (
			<div className="well">
				<h1>{'Hi! I\'m Collision game'}</h1>
				<Link to="game-pad" className="btn btn-primary">{'Join the game'}</Link>
			</div>
		)
	}

})
