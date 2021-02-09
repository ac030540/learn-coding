/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as EmailValidator from 'email-validator';
import * as PasswordValidator from 'password-validator';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Loading from '../common/Loading';
import { auth as firebaseAuth } from '../../firebase.config';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const initialUserDetails = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [loading, setLoading] = useState(false);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);
  const initialErrors = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  }
  const auth = useStoreState((state) => state.auth);
  const setAuth = useStoreActions((actions) => actions.setAuth);
  const [errors, setErrors] = useState(initialErrors);


  const onChangeHandler = (event) => {
    const { currentTarget, target } = event;
    const { value } = target;
    setErrors({ ...errors, firstName: false, lastName: false, email: false, password: false })
    if (currentTarget.name === 'email') setUserDetails((user) => ({ ...user, email: value }));
    else if (currentTarget.name === 'password')
      setUserDetails((user) => ({ ...user, password: value }));
    else if (currentTarget.name === 'firstName')
      setUserDetails((user) => ({ ...user, firstName: value }));
    else if (currentTarget.name === 'lastName')
      setUserDetails((user) => ({ ...user, lastName: value }));
  };

  const updateSnackbar = (message, severity = 'error') => {
    setSnackbarStates({
      open: true,
      severity,
      message,
    });
  };

  const handleValidation = () => {
    const schema = new PasswordValidator();
    let valid = true;
    // password schema
    schema
      .is().min(8) // Minimum length 8
      .is().max(100) // Maximum length 100

    if (userDetails.firstName.trim() === '') {
      setErrors({ ...errors, firstName: true });
      updateSnackbar('Invalid first name');
      valid = false;
    } else if (userDetails.lastName.trim() === '') {
      setErrors({ ...errors, lastName: true });
      updateSnackbar('Invalid last name');
      valid = false;
    } else if (!EmailValidator.validate(userDetails.email)) {
      setErrors({ ...errors, email: true });
      updateSnackbar('Invalid email address');
      valid = false;
    } else if (!schema.validate(userDetails.password)) {
      setErrors({ ...errors, password: true });
      updateSnackbar('Invalid Password');
      valid = false;
    }
    return valid;
  };

  const updateDB = (uid, emailVerified) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid,
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          setAuth({
            ...auth,
            uid,
            email: userDetails.email,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            emailVerified,
          });
          setLoading(false);
          setUserDetails(initialUserDetails);
          setErrors(initialErrors);
          updateSnackbar('Signed up successfully', 'success');
          history.push('/profile');
        } else {
          updateSnackbar('Error signing up the user');
        }
      })
      .catch(() => {
        setLoading(false);
        updateSnackbar('Cannot Signup the user');
      })
  };

  const  createUserOnFirebaseAuth = async () => {
    try{
      const { user } = await firebaseAuth.createUserWithEmailAndPassword(userDetails.email, userDetails.password);
      const { uid, emailVerified } = user;
      if(uid) updateDB(uid, emailVerified);
    }
    catch{
      setLoading(false);
      updateSnackbar('Cannot Signup the user');
    }
  };

  const handleSignup = () => {
    setLoading(true);
    if(handleValidation()) {
      createUserOnFirebaseAuth();
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={userDetails.firstName}
                autoFocus
                error={errors.firstName}
                disabled={loading}
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                disabled={loading}
                value={userDetails.lastName}
                autoComplete="lname"
                error={errors.lastName}
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                disabled={loading}
                value={userDetails.email}
                autoComplete="email"
                error={errors.email}
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                disabled={loading}
                onChange={onChangeHandler}
                value={userDetails.password}
                error={errors.password}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignup}
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
};

export default SignUp;
