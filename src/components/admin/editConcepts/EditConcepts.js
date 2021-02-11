import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import Loading from '../../common/Loading';
import ConceptDetails from './ConceptDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditConcepts = () => {
  const [concept, setConcept] = useState({});
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);

  // const setLevel = useStoreActions((actions) => actions.setLevel);
  const classes = useStyles();
  // console.log(concepts);
  useEffect(() => {
    // fetching the data of the concepts
    fetch(`${process.env.REACT_APP_SERVER_URL}/concept/${_id}`, {
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

  return (
    <div>
      <CssBaseline />
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Container maxWidth="lg">
            <ConceptDetails concept={concept} setConcept={setConcept} />
            <Button variant="contained" color="primary" className={classes.submit}>
              Edit
            </Button>
          </Container>
        </div>
      )}
    </div>
  );
};

export default EditConcepts;
