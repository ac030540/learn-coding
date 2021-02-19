import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Loading from '../common/Loading';
import MainPageBreadcrums from './MainPageBreadcrums';
import LanguageSelector from './LanguageSelector';
import Content from './Content';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [subconcept, setSubconcept] = useState({});
  const [language, setLanguage] = useState('python');
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
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <Box className={classes.content}>
              <Content language={language} subconcept={subconcept} />
            </Box>
          </Container>
        </Box>
      )}
    </div>
  );
};

export default MainPage;
