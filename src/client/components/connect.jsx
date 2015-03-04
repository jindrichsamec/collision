import React from 'react'
import Router from 'react-router'
import {Link} from 'react-router'

export default React.createClass({

	mixins: [ Router.State ],

	render() {
		var url = 'http://192.168.231.141:8000/signin/' + this.getParams().hash;
		var src = 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=' + url;
		return (
			<div>
				<div className="alert">{'Waiting for players...'}</div>
				<img src={src} width={200} height={200} />
				<p><Link to="signin" params={{hash: this.getParams().hash}}>{url}</Link></p>
				<p><Link to="game" params={{hash: this.getParams().hash}}>Go to the Game (temporarily)</Link></p>
			</div>
		);
	}

});