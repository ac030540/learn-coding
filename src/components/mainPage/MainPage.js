import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useStoreActions } from 'easy-peasy';
import Loading from '../common/Loading';
import MainPageBreadcrums from './MainPageBreadcrums';
import LanguageSelector from './LanguageSelector';
import Content from './Content';
import ReactAceCodeEditor from '../common/ReactAceCodeEditor';
import { makeLanguagesArray } from '../../commonFunctions';
import DebugMode from './DebugMode';

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
  debug: {
    marginTop: theme.spacing(1),
  },
}));

const MainPage = ({ adminRoute }) => {
  const [loading, setLoading] = useState(true);
  const [subconcept, setSubconcept] = useState({});
  const [language, setLanguage] = useState('');
  const [languagesArray, setLanguagesArray] = useState([]);
  const [code, setCode] = useState('');
  const { subconceptId } = useParams();
  const setDebug = useStoreActions((actions) => actions.setDebug);
  const classes = useStyles();
  // console.log(subconcept);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/subConcept/${subconceptId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (language === '') {
            const array = makeLanguagesArray(data.data);
            setLanguagesArray(array);
            setLanguage(array[0].value);
          }
          if (language === 'Python3')
            setCode(data.data.python.codingTemplate ? data.data.python.codingTemplate : '');
          else setCode(data.data.java.codingTemplate ? data.data.java.codingTemplate : '');
          setSubconcept(data.data);
          // console.log('updated data');
          setLoading(false);
        }
      });
  }, [language]);

  useEffect(
    () => () => {
      // clean up event
      setDebug(false);
    },
    []
  );

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
                    <MainPageBreadcrums adminRoute={adminRoute} subconcept={subconcept} />
                  </Grid>
                  <Grid item>
                    {subconcept.coding && <DebugMode language={language} setCode={setCode} />}
                    <LanguageSelector
                      languagesArray={languagesArray}
                      language={language}
                      setLanguage={setLanguage}
                    />
                  </Grid>
                </Grid>
                <Box>
                  <Content language={language} subconcept={subconcept} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box className={classes.editor}>
                  <ReactAceCodeEditor
                    showSubmit={subconcept.coding}
                    language={language}
                    value={code}
                    setValue={setCode}
                  />
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
