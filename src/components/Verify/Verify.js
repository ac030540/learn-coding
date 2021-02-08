import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStoreActions } from 'easy-peasy';
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
  resetText: {
    margin: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Verify = () => {
  const classes = useStyles();
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const user = firebaseAuth.currentUser;
    if (user) user.sendEmailVerification();
  }, []);

  const handleVerify = () => {
    setLoading(true);
    setDisabled(true);
    const user = firebaseAuth.currentUser;

    user
      .sendEmailVerification()
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
          message: 'Error sending the email. We may have already sent you the email.',
        });
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MailOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Email Verification
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="body2" className={classes.resetText}>
                We have sent you an email verification link on your registered email address. Please
                verify your email address to access our services.
              </Typography>
            </Grid>
          </Grid>
          {loading && <Loading />}
          <Button
            onClick={handleVerify}
            fullWidth
            variant="contained"
            color="primary"
            disabled={disabled}
            className={classes.submit}
          >
            Resend verification link
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Verify;
