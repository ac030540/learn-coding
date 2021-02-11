import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';
import LevelSelector from './LevelSelector';
import ConceptCardsArray from './ConceptCardsArray';
import Loading from '../../common/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Concepts = () => {
  const [concepts, setConcepts] = useState({});
  const [loading, setLoading] = useState(true);
  const level = useStoreState((state) => state.level);
  const setLevel = useStoreActions((actions) => actions.setLevel);
  const classes = useStyles();
  const history = useHistory();

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

  return loading ? (
    <Loading />
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography className={classes.title} component="h1" variant="h5">
          Concepts
        </Typography>
        <LevelSelector level={level} setLevel={setLevel} />
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => history.push('/admin/concepts/create')}
        >
          Add concept
        </Button>
        <ConceptCardsArray concepts={concepts.data} />
      </Container>
    </div>
  );
};

export default Concepts;
