import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SubconceptDetails from '../editSubconcept/SubconceptDetails';
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

const CreateSubconcept = () => {
  // const level = useStoreState((state) => state.level);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const auth = useStoreState((state) => state.auth);
  const { conceptId } = useParams();
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);
  const history = useHistory();
  const [language, setLanguage] = useState('python');
  const [subconcept, setSubconcept] = useState({
    title: '',
    description: '',
    story: '',
    hint: '',
    codingTemplate: '',
    answer: '',
    inputFile: '',
    outputFile: '',
    order: '',
    coding: true,
    referencesId: [],
  });
  const classes = useStyles();

  const handleCreateConcept = () => {
    setBackdropOpen(true);
    const formData = new FormData();
    formData.append('title', subconcept.title);
    formData.append('description', subconcept.description);
    formData.append('story', subconcept.story);
    formData.append('hint', subconcept.hint);
    formData.append('codingTemplate', subconcept.codingTemplate);
    formData.append('answer', subconcept.answer);
    formData.append('inputFile', subconcept.inputFile);
    formData.append('outputFile', subconcept.outputFile);
    formData.append('conceptId', conceptId);
    formData.append('order', subconcept.order);
    formData.append('coding', subconcept.coding);
    formData.append('email', auth.email);
    formData.append('referencesId', JSON.stringify(subconcept.referencesId));

    fetch(`${process.env.REACT_APP_SERVER_URL}/subConcept?language=${language}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          history.push(`/admin/concepts/${conceptId}`);
          setSnackbarStates({
            open: true,
            severity: 'success',
            message: 'Successfully added subconcept',
          });
        } else {
          setBackdropOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'error',
            message: 'Error adding the subconcept',
          });
        }
      })
      .catch(() => {
        setBackdropOpen(false);
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error adding the subconcept',
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
          Add Subconcept
        </Typography>
      </div>
      <div className={classes.root}>
        <SubconceptDetails
          subconcept={subconcept}
          setSubconcept={setSubconcept}
          language={language}
          setLanguage={setLanguage}
        />
        <Button
          variant="contained"
          onClick={handleCreateConcept}
          color="primary"
          className={classes.submit}
        >
          Create
        </Button>
      </div>
    </Container>
  );
};

export default CreateSubconcept;
