import { useState } from 'react';
import { useHistory } from 'react-router';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ConceptDetails from '../editConcepts/ConceptDetails';
import CustomBackdrop from '../../common/Backdrop';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(2),
  },
  titleWrapper: {
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

const CreateConcepts = () => {
  const level = useStoreState((state) => state.level);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const auth = useStoreState((state) => state.auth);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);
  const history = useHistory();
  const [concept, setConcept] = useState({
    title: '',
    category: level,
    order: '',
    description: '',
  });
  const classes = useStyles();

  const handleCreateConcept = () => {
    setBackdropOpen(true);
    const formData = new FormData();
    formData.append('description', concept.description);
    formData.append('title', concept.title);
    formData.append('category', concept.category);
    formData.append('order', concept.order);
    formData.append('email', auth.email);

    fetch(`${process.env.REACT_APP_SERVER_URL}/concept`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          history.push('/admin/concepts');
          setSnackbarStates({
            open: true,
            severity: 'success',
            message: 'Successfully added concept',
          });
        } else {
          setBackdropOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'error',
            message: 'Error adding the concept',
          });
        }
      })
      .catch(() => {
        setBackdropOpen(false);
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error adding the concept',
        });
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <CustomBackdrop open={backdropOpen} />
      <div className={classes.titleWrapper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add concept
        </Typography>
      </div>
      <div className={classes.root}>
        <ConceptDetails concept={concept} setConcept={setConcept} />
        <Button
          variant="contained"
          onClick={handleCreateConcept}
          color="primary"
          className={classes.submit}
        >
          Create
        </Button>
        <Button
          variant="outlined"
          onClick={() => history.goBack()}
          color="primary"
          className={classes.submit}
        >
          cancel
        </Button>
      </div>
    </Container>
  );
};

export default CreateConcepts;
