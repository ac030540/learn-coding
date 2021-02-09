import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Loading from '../common/Loading';
import { auth as firebaseAuth } from '../../firebase.config';
import useRedirectSignedUser from '../../customHooks/useRedirectSignedUser';

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useStoreState((state) => state.auth);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const setAuth = useStoreActions((actions) => actions.setAuth);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);

  useRedirectSignedUser();

  const onChangeHandler = (event) => {
    setError(false);
    const { currentTarget, target } = event;
    const { value } = target;
    if (currentTarget.name === 'email') setEmail(value);
    else if (currentTarget.name === 'password') setPassword(value);
  };

  const updateSnackbar = (message, severity) => {
    setSnackbarStates({
      open: true,
      severity,
      message,
    });
  };

  const signInWithFirebaseAuth = () => {
    setLoading(true);
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const { user } = response;
        const { uid, emailVerified } = user;
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${uid}`, {
          method: 'GET',
        })
          .then((userResponse) => userResponse.json())
          .then((userData) => {
            if (userData.success) {
              setAuth({
                ...auth,
                uid,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email,
                emailVerified,
              });
              updateSnackbar('Successfully logged in', 'success');
              setLoading(false);
              if (emailVerified) {
                history.push('/profile');
              } else {
                history.push('/verify');
              }
            }
          });
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        updateSnackbar('Invalid Credentials', 'error');
      });
  };

  const handleSignIn = () => {
    signInWithFirebaseAuth();
  };

  return (
    <div>
      {loading && <Loading />}
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              disabled={loading}
              value={email}
              onChange={onChangeHandler}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={error}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={password}
              disabled={loading}
              fullWidth
              onChange={onChangeHandler}
              name="password"
              label="Password"
              type="password"
              id="password"
              error={error}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignIn}
              disabled={loading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
