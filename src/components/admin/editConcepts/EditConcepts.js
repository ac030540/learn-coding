import { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useParams, useHistory } from 'react-router';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Loading from '../../common/Loading';
import ConceptDetails from './ConceptDetails';
import CustomBackdrop from '../../common/Backdrop';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

const EditConcepts = () => {
  const [concept, setConcept] = useState({});
  const { conceptId } = useParams();
  const [loading, setLoading] = useState(true);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const auth = useStoreState((state) => state.auth);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);
  const history = useHistory();

  // const setLevel = useStoreActions((actions) => actions.setLevel);
  const classes = useStyles();
  // console.log(concepts);
  useEffect(() => {
    // fetching the data of the concepts
    fetch(`${process.env.REACT_APP_SERVER_URL}/concept/${conceptId}?email=${auth.email}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setConcept(data.data);
          // setConcepts(data);
          setLoading(false);
        }
      });
  }, []);

  const handleEditConcept = () => {
    setBackdropOpen(true);
    const formData = new FormData();
    formData.append('description', concept.description);
    formData.append('title', concept.title);
    formData.append('category', concept.category);
    formData.append('order', concept.order);
    formData.append('email', auth.email);

    fetch(`${process.env.REACT_APP_SERVER_URL}/concept/${conceptId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          history.push('/admin/concepts');
          setSnackbarStates({
            open: true,
            severity: 'success',
            message: 'Successfully edited concept',
          });
        } else {
          setBackdropOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'error',
            message: 'Error editing the concept',
          });
        }
      })
      .catch(() => {
        setBackdropOpen(false);
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error editing the concept',
        });
      });
  };

  return (
    <div>
      <CssBaseline />
      <CustomBackdrop open={backdropOpen} />
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Container component="main" maxWidth="md">
            <div className={classes.titleWrapper}>
              <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Concept
              </Typography>
            </div>
            <ConceptDetails concept={concept} setConcept={setConcept} />
            <Button
              variant="contained"
              onClick={handleEditConcept}
              color="primary"
              className={classes.submit}
            >
              Edit
            </Button>
          </Container>
        </div>
      )}
    </div>
  );
};

export default EditConcepts;
