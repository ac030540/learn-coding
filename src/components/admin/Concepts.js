import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import LevelSelector from './LevelSelector';
import ConceptCardsArray from './ConceptCardsArray';
import Loading from '../common/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

const Concepts = () => {
  const [level, setLevel] = useState('Beginner');
  const [concepts, setConcepts] = useState({});
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    // fetching the data of the concepts
    fetch(`${process.env.REACT_APP_SERVER_URL}/concept?category=${level}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setConcepts(data);
          setLoading(false);
        }
      });
  }, [level]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="lg">
        <LevelSelector level={level} setLevel={setLevel} />
        {loading ? <Loading /> : <ConceptCardsArray concepts={concepts.data} />}
      </Container>
    </div>
  );
};

export default Concepts;
