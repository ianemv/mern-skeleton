import React, {useState} from 'react'

import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


function Menu() {
	const [isSignin, setSetin] = useState(false);
	return (
		<AppBar position="static">
		<Toolbar>
			<IconButton edge="start" color="inherit" aria-label="menu">
			<MenuIcon />
			</IconButton>
			<Typography variant="h6" color="inherit" component="div">
			Home
			</Typography>
			<Link href="/">Sign Up</Link>
		</Toolbar>
		</AppBar>
	);
}
  
  export default Menu;
