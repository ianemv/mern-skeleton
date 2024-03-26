import React, { useState, useEffect}  from 'react'
import { Link as RouterLink } from 'react-router-dom';

// mui imports
import { makeStyles } from 'tss-react/mui';

import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import {list} from './api-user.js'
import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar'
//import Person from '@mui/core/Person'
//import ArrowForward from '@mui/core/ArrowForward'
import { CardContent, CardMedia } from '@mui/material'
import Typography from '@mui/material/Typography'
//import ArrowForward from '@mui/core/ArrowForward'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import unicorn from '../assets/images/unicorn.png'

const useStyles = makeStyles()(theme => ({
		card: {
		// Define your card styles here
		},
		textField: {
		// Define your text field styles here
		},
		error: {
		// Define your error icon styles here
		},
		submit: {
		// Define your submit button styles here
		},
		title: {
		// Define your title styles here
		},
		root: {
		// Define your root styles here
		},
}));

export default function Users() {
const [users, setUsers] = useState([])
useEffect(() => {
const abortController = new AbortController()
const signal = abortController.signal
list(signal).then((data) => {
console.log(data)
if (data && data.error) {
console.log(data.error)
} else {
 console.log(data)
setUsers(data)
}
})
return function cleanup(){
abortController.abort()
}
}, [])

const { classes } = useStyles()
return (
<Paper className={classes.root} elevation={4}>
<Typography variant="h6" className={classes.title}>
All Users
</Typography>
<List dense>
{users.map((item, i) => {
return <Link component={RouterLink} to={"/user/" + item._id} key={i}>

<ListItem button>
<ListItemAvatar>
<Avatar>
</Avatar>
</ListItemAvatar>
<ListItemText primary={item.name}/>
<ListItemSecondaryAction>
<IconButton>
<ArrowForwardIcon/>
</IconButton>
</ListItemSecondaryAction>
</ListItem>
</Link>
})}
</List>
</Paper>
)
}