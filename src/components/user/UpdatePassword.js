import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { auth as firebaseAuth } from '../../firebase.config';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  grid: {
    marginTop: theme.spacing(2),
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const UpdatePassword = ({ setLoading }) => {
  const classes = useStyles();
  const auth = useStoreState((state) => state.auth);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);

  const [disabled, setDisabled] = useState(false);

  const handleUpdatePassword = () => {
    setLoading(true);
    setDisabled(true);
    firebaseAuth
      .sendPasswordResetEmail(auth.email)
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
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Update Password
        </Typography>
        <Divider />
        <Grid className={classes.grid} container justify="space-between" spacing={2}>
          <Grid item lg={9}>
            <Typography component="h1" variant="body2">
              Want to update your password? We will send you a password reset link on your
              registered email address.
            </Typography>
          </Grid>
          <Grid className={classes.gridItem} item lg={3}>
            <Button
              onClick={handleUpdatePassword}
              variant="outlined"
              color="primary"
              disabled={disabled}
            >
              Send Reset Link
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UpdatePassword;
