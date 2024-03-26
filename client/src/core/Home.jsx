import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import unicorn from '../assets/images/unicorn.png'
function Home() {
	return (
		<>
			
			<Card>
			<CardContent>
				<Typography variant="h5" component="div">
			Home
				</Typography>
				<Typography variant="body2" color="text.secondary">
				This is some text inside the card. You can customize it as needed.
				</Typography>
				<img src={unicorn} alt="Description of the image" />
			</CardContent>
			</Card>
		</>
	)
}

export default Home
