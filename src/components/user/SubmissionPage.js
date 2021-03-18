import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CssBaseline, Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Loading from '../common/Loading';
import MainPageBreadcrums from '../mainPage/MainPageBreadcrums';
import LanguageSelector from '../mainPage/LanguageSelector';
import Content from '../mainPage/Content';
import ReactAceCodeEditor from '../common/ReactAceCodeEditor';
import { makeLanguagesArray } from '../../commonFunctions';
import DebugMode from '../mainPage/DebugMode';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    // overflowY: 'hidden',
    // height: '90vh',
  },
  content: {
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
  const history = useHistory();
  const { submissionId } = useParams();
  const classes = useStyles();
  // console.log(subconcept);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/submission/${submissionId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (language === '') {
            const array = makeLanguagesArray(data.data.subConceptId);
            setLanguagesArray(array);
            setLanguage(array[0].value);
          }
          if (language === 'Python3')
            setCode(
              data.data.subConceptId.python.codingTemplate
                ? data.data.subConceptId.python.codingTemplate
                : ''
            );
          else
            setCode(
              data.data.subConceptId.java.codingTemplate
                ? data.data.subConceptId.java.codingTemplate
                : ''
            );
          setSubconcept(data.data.subConceptId);
          // console.log('updated data');
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
                <Button variant="outlined" onClick={() => history.goBack()} color="primary">
                  Go back
                </Button>
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
