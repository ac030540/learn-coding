import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStoreState } from 'easy-peasy';
import useRedirectUnsignedUser from '../../customHooks/useRedirectUnsignedUser';
import useRedirectUnverifiedUser from '../../customHooks/useRedirectUnverifiedUser';

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
}));

const Profile = () => {
  const classes = useStyles();
  const auth = useStoreState((state) => state.auth);
  useRedirectUnsignedUser();
  useRedirectUnverifiedUser();
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          {auth.firstName} {auth.lastName}
        </Typography>
        <Typography component="h1" variant="body2">
          {auth.email}
        </Typography>
      </div>
    </Container>
  );
};

export default Profile;
