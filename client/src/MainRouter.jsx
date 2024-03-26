import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Users from './user/Users';
import Signin from './user/Signin';
import Signup from './user/Signup';
import EditProfile from './user/EditProfile';
import Profile from './user/Profile';
import PrivateRoute from './lib/PrivateRoute'

function MainRouter() {
	return (
		<>
			<Menu/>
			<div style={{display:'flex',flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3em' }}>
			<Routes>
				<Route exact path="/" element={<Home/>}/>
				<Route path="/users" element={<Users/>}/>
				<Route path="/signin" element={<Signin/>}/>
				<Route path="/signup" element={<Signup/>}/>
				<Route path="/editprofile" element={<Signup/>}/>
				<Route path="/user/:userId" element={<Profile/>}/>
				<Route
				path="/user/edit/:userId"
					element={
						<PrivateRoute>
							<EditProfile />
						</PrivateRoute>
					}
				/>

			</Routes>
			</div>
		</>
	)
}

export default MainRouter
