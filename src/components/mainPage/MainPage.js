import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Loading from '../common/Loading';
import MainPageBreadcrums from './MainPageBreadcrums';

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
  },
}));

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [subconcept, setSubconcept] = useState({});
  const { subconceptId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/subConcept/${subconceptId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubconcept(data.data);
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
        <Box className={classes.root}>
          <Container component="main" maxWidth="xl">
            <MainPageBreadcrums subconcept={subconcept} />
          </Container>
        </Box>
      )}
    </div>
  );
};

export default MainPage;
