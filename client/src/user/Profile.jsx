/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// icons
import Edit from '@mui/icons-material/Edit';
import Person from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider'

//components
import DeleteUser from './DeleteUser'
import auth from '../lib/auth-helper.js'
import {read} from './api-user.js'
import {useLocation, Navigate, Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
 const useStyles = makeStyles(theme => ({
 root: theme.mixins.gutters({
 maxWidth: 600,
 margin: 'auto',
 padding: theme.spacing(3),
 marginTop: theme.spacing(5)
 }),
 title: {
 marginTop: theme.spacing(3),
 color: theme.palette.protectedTitle
 }
}))
export default function Profile({ match }) {
 const location = useLocation();
 const classes = useStyles()
 const [user, setUser] = useState({})
 const [redirectToSignin, setRedirectToSignin] = useState(false)
 const jwt = auth.isAuthenticated()
 const { userId } = useParams();
 useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: userId }, { t: jwt.token }, signal)
        .then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true);
            } else {
                setUser(data);
            }
        })
        .catch((error) => {
            // Handle fetch errors
            console.error('Error fetching data:', error);
            if (error.name === 'AbortError') {
                // Handle abort error
                console.log('Fetch aborted:', error.message);
            } else {
                // Handle other errors
                console.error('Error fetching data:', error);
            }
        });

    return function cleanup() {
        abortController.abort();
    };
}, [userId, jwt.token]);

 
 if (redirectToSignin) {
 return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
 
 }
 if (auth.isAuthenticated()) {
 console.log( auth.isAuthenticated().user._id)
 console.log(user._id)
 }
 return (
<Paper className={classes.root} elevation={4}>
<Typography variant="h6" className={classes.title}>
 Profile
</Typography>
<List dense>
<ListItem>
<ListItemAvatar>
<Avatar>
 <Person/>
</Avatar>
</ListItemAvatar>
<ListItemText primary={user?.name} secondary={user?.email}/> {
auth.isAuthenticated().user && auth.isAuthenticated().user?._id == user?._id &&
 (<ListItemSecondaryAction>
<Link to={"/user/edit/" + user._id}>
<IconButton aria-label="Edit" color="primary">

<Edit/>
</IconButton>
</Link>
<DeleteUser userId={user?._id}/>
</ListItemSecondaryAction>)
 }
</ListItem>
<Divider/>
<ListItem>
<ListItemText primary={"Joined: " + (
new Date(user?.created)).toDateString()}/>
 </ListItem>
 </List>
 </Paper>
 )
 }


