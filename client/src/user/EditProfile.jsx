import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// import Icon from '@mui/material/Icon'
import Icon from '@mui/material/Icon';
import auth from '../lib/auth-helper.js'
import {read, update} from './api-user.js'
import {Navigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles(theme => ({
card: {
maxWidth: 600,
margin: 'auto',
textAlign: 'center',
marginTop: theme.spacing(5),
paddingBottom: theme.spacing(2)
},
title: {
margin: theme.spacing(2),
color: theme.palette.protectedTitle
},
error: {
verticalAlign: 'middle'
},
textField: {
marginLeft: theme.spacing(1),
marginRight: theme.spacing(1),
width: 300
},
submit: {
margin: 'auto',
marginBottom: theme.spacing(2)
}
}))
export default function EditProfile() {
const classes = useStyles()
const { userId } = useParams();
const [values, setValues] = useState({
name: '',
password: '',
email: '',
open: false,
error: '',
NavigateToProfile: false
})
const jwt = auth.isAuthenticated()
useEffect(() => {
const abortController = new AbortController()
const signal = abortController.signal
read({
userId: userId
}, {t: jwt.token}, signal).then((data) => {
if (data && data.error) {
setValues({...values, error: data.error})
} else {
setValues({...values, name: data.name, email: data.email})
}
})
return function cleanup(){
abortController.abort()
}
}, [userId])
const clickSubmit = () => {
const user = {
name: values.name || undefined,
email: values.email || undefined,
password: values.password || undefined
}
update({
userId: userId
}, {
t: jwt.token
}, user).then((data) => {
if (data && data.error) {
	setValues({...values, error: data.error})
} else {
	setValues({...values, userId: data._id, NavigateToProfile: true})
}
})
}
const handleChange = name => event => {
	setValues({...values, [name]: event.target.value})
}
const handleCheck = (event, checked) => { 
	setValues({...values, seller: checked})
}

if (values.NavigateToProfile) {
	return (<Navigate to={'/user/' + values.userId}/>)
}
return (
<Card className={classes.card}>
<CardContent>
<Typography variant="h6" className={classes.title}>
Edit Profile
</Typography>
<TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
<TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
<TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
<br/> {
values.error && (<Typography component="p" color="error">
<Icon color="error" className={classes.error}>error</Icon>
{values.error}
</Typography>)
}
<Typography variant="subtitle1" className={classes.subheading}> 
Seller Account
</Typography>
<FormControlLabel
control={
<Switch
classes={{
checked: classes.checked,
bar: classes.bar,
}}
checked={values.seller}
onChange={handleCheck}
/>
}
label={values.seller? 'Active' : 'Inactive'} 
/>
</CardContent>
<CardActions>
<Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
</CardActions>
</Card>
)
}


