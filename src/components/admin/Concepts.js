import { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import LevelSelector from './LevelSelector';
import ConceptCardsArray from './ConceptCardsArray';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

const Concepts = () => {
  const [level, setLevel] = useState('Beginner');
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="lg">
        <LevelSelector level={level} setLevel={setLevel} />
        <ConceptCardsArray />
      </Container>
    </div>
  );
};

export default Concepts;
