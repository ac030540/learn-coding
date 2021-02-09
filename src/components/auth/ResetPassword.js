import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStoreActions } from 'easy-peasy';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  resetText: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useRedirectSignedUser();
  const handleResetPassword = () => {
    setLoading(true);
    setDisabled(true);
    firebaseAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        setSnackbarStates({
          open: true,
          severity: 'success',
          message: 'Successfully sent the reset email',
        });
        setLoading(false);
        setDisabled(true);
      })
      .catch(() => {
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error sending the email',
        });
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && <Loading />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKeyOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
            </Grid>
            <Typography component="h1" variant="body2" className={classes.resetText}>
              We will send you a password reset link on your registered email address.
            </Typography>
            <Button
              onClick={handleResetPassword}
              fullWidth
              variant="contained"
              color="primary"
              disabled={disabled}
              className={classes.submit}
            >
              Send Reset Link
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Back to sign in page
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
