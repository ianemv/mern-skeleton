import React, {useState} from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import { makeStyles } from 'tss-react/mui';
import auth from '../lib/auth-helper.js'
import {Navigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import {signin} from '../lib/api-auth.js'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    width: 'auto',
    marginBottom: theme.spacing(2)
  }
}))
export default function Signin(props) {
  const location = useLocation();
  const classes = useStyles()
  const [values, setValues] = useState({
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  })
  const clickSubmit =  () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }
    signin(user).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error})
      } else {
        console.log(data)
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const {from} = location.state || {
      from: {
        pathname: '/'
      }
  }
  const {redirectToReferrer} = values
  if (redirectToReferrer) {
    return <Navigate to={from}/>;
     
  }
  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
}