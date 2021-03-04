import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EditPersonalDetails = ({ setLoading }) => {
  const classes = useStyles();
  const auth = useStoreState((state) => state.auth);
  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);
  const setAuth = useStoreActions((actions) => actions.setAuth);

  const handleUpdateDetails = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('uid', auth.uid);
    formData.append('email', auth.email);
    formData.append('firstName', auth.firstName);
    formData.append('lastName', auth.lastName);

    fetch(`${process.env.REACT_APP_SERVER_URL}/user/${auth.id}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          setAuth({
            ...auth,
            firstName,
            lastName,
          });
          setSnackbarStates({
            open: true,
            severity: 'success',
            message: 'Successfully updated the details',
          });
        } else {
          setLoading(false);
          setSnackbarStates({
            open: true,
            severity: 'error',
            message: 'Error editing the details',
          });
        }
      })
      .catch(() => {
        setLoading(false);
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error editing the details',
        });
      });
  };

  return (
    <div className={classes.paper}>
      <Divider />
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="h2">
                Personal Information
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Email: {auth.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="firstName"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="lastName"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleUpdateDetails}
            className={classes.button}
            variant="outlined"
            color="primary"
          >
            Update
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default EditPersonalDetails;
