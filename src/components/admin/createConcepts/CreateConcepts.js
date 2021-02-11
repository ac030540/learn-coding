import { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ConceptDetails from '../editConcepts/ConceptDetails';

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

const CreateConcepts = () => {
  const level = useStoreState((state) => state.level);
  const [concept, setConcept] = useState({
    title: '',
    category: level,
    order: '',
    description: '',
  });
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
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
        <Button variant="contained" color="primary" className={classes.submit}>
          Create
        </Button>
      </div>
    </Container>
  );
};

export default CreateConcepts;
