import App from './components/app'
import Home from './components/home'
import NotFound from './components/notfound'
import GamePad from './components/gamepad'
import Game from './components/game'
import NewGame from './components/newgame'
import Connect from './components/connect'
import SignIn from './components/signin'
import React from 'react'
import {DefaultRoute, NotFoundRoute, Route} from 'react-router'

export default (
	<Route handler={App} path="/">
		<DefaultRoute handler={Home} name="home" />
		<NotFoundRoute handler={NotFound} name="not-found" />
		<Route handler={GamePad} name="game-pad" path="/game-pad/:hash" />
		<Route handler={NewGame} name="new-game" path="/new-game/" />
		<Route handler={Game} name="game" path="/game/:hash" />
		<Route handler={Connect} name="connect" path="/connect/:hash" />
		<Route handler={SignIn} name="signin" path="/signin/:hash" />
	</Route>
)
