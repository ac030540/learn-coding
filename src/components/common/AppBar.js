import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import BookIcon from '@material-ui/icons/Book';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeveloperMode from '@material-ui/icons/DeveloperMode';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { auth as firebaseAuth } from '../../firebase.config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleText: {
    cursor: 'pointer',
  },
  signInButton: {
    marginRight: theme.spacing(1),
  },
}));

const CustomAppBar = () => {
  const classes = useStyles();
  const auth = useStoreState((state) => state.auth);
  // const setAuth = useStoreActions((actions) => actions.setAuth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const history = useHistory();

  const handleSignIn = () => history.push('/signin');

  const handleLogout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        // Sign-out successful.
        setSnackbarStates({
          open: true,
          severity: 'success',
          message: 'Successfully signed out',
        });
      })
      .catch(() => {
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Unable to signout',
        });
        // An error happened.
      });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    handleClose();
    history.push(path);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar id="back-to-top-anchor">
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
            <span className={classes.titleText}>Learn Coding</span>
          </Typography>
          {auth && auth.uid ? (
            <div>
              <IconButton onClick={() => history.push('/references')} color="inherit">
                <BookIcon />
              </IconButton>
              <IconButton onClick={() => history.push('/editor')} color="inherit">
                <DeveloperMode />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleMenuItemClick('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/settings')}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button className={classes.signInButton} color="inherit" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button color="inherit" onClick={() => history.push('/signup')}>
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
