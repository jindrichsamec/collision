import App from './components/app'
import Home from './components/home'
import NotFound from './components/notfound'
import GamePad from './components/gamepad'
import React from 'react'
import {DefaultRoute, NotFoundRoute, Route, GamePadRoute} from 'react-router'

export default (
	<Route handler={App} path="/">
		<DefaultRoute handler={Home} name="home" />
		<NotFoundRoute handler={NotFound} name="not-found" />
		<Route handler={GamePad} name="game-pad" />
	</Route>
)
