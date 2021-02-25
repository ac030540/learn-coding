import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Loading from '../common/Loading';
import MainPageBreadcrums from './MainPageBreadcrums';
import LanguageSelector from './LanguageSelector';
import Content from './Content';
import ReactAceCodeEditor from '../common/ReactAceCodeEditor';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    // overflowY: 'hidden',
    // height: '90vh',
  },
  content: {
    marginTop: theme.spacing(2),
    // overflowY: 'scroll',
    // overflowX: 'hidden',
    // height: '89vh',
  },
}));

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [subconcept, setSubconcept] = useState({});
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const { subconceptId } = useParams();
  const classes = useStyles();
  console.log(subconcept);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/subConcept/${subconceptId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubconcept(data.data);
          if (language === 'python') setCode(data.data.python.codingTemplate);
          else setCode(data.data.java.codingTemplate);
          setLoading(false);
        }
      });
  }, [language]);

  return (
    <div>
      <CssBaseline />
      {loading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Container component="main" maxWidth="xl">
            <Grid container spacing={2} className={classes.content}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2} justify="space-between">
                  <Grid item>
                    <MainPageBreadcrums subconcept={subconcept} />
                  </Grid>
                  <Grid item>
                    <LanguageSelector language={language} setLanguage={setLanguage} />
                  </Grid>
                </Grid>
                <Box>
                  <Content language={language} subconcept={subconcept} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.editor}>
                  <ReactAceCodeEditor language={language} value={code} setValue={setCode} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </div>
  );
};

export default MainPage;
