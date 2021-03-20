import { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CssBaseline, Box, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useStoreActions } from 'easy-peasy';
import Loading from '../common/Loading';
import Breadcrumbs from '../common/Breadcrums';
import Viewer from '../common/MarkdownViewer';

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
  code: {
    margin: '-12px',
  },
  debug: {
    marginTop: theme.spacing(1),
  },
}));

const SubmissionPage = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [submissionDetails, setSubmissionDetails] = useState({});
  const { submissionId } = useParams();
  const setLevel = useStoreActions((actions) => actions.setLevel);
  const classes = useStyles();
  // console.log(subconcept);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/submission/${submissionId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubmissionDetails(data.data);
          setLoading(false);
        }
      });
  }, []);

  const breadcrumbsData = useRef([]);
  useEffect(() => {
    if (JSON.stringify(submissionDetails) !== '{}') {
      const javaCode = '```java ';
      const pythonCode = '```python ';
      if (submissionDetails.language === 'Python3')
        submissionDetails.code = pythonCode.concat(submissionDetails.code);
      else submissionDetails.code = javaCode.concat(submissionDetails.code);
      breadcrumbsData.current = [
        {
          text: submissionDetails.conceptId.category,
          onClick: () => {
            setLevel(submissionDetails.conceptId.category);
            history.push('/concepts');
          },
        },
        {
          text: submissionDetails.conceptId.title,
          onClick: () => {
            setLevel(submissionDetails.conceptId.category);
            history.push(`/concepts/${submissionDetails.conceptId._id}`);
          },
        },
        {
          text: submissionDetails.subConceptId.title,
          onClick: () => {
            setLevel(submissionDetails.conceptId.category);
            history.push(`/subconcepts/${submissionDetails.subConceptId._id}`);
          },
        },
        {
          text: 'Submission',
        },
      ];
    }
  }, [submissionDetails]);

  return (
    <div>
      <CssBaseline />
      {loading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Container component="main" maxWidth="lg">
            <Grid container spacing={2} className={classes.content}>
              <Grid item xs={12}>
                <Button variant="outlined" onClick={() => history.goBack()} color="primary">
                  Go back
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.breadcrumbs}>
                  <Breadcrumbs data={breadcrumbsData.current} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Language: {submissionDetails.language}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">CODE:</Typography>
                {submissionDetails.code === '```python  ' ||
                submissionDetails.code === '```java  ' ? (
                  <Typography variant="body1" color="textSecondary">
                    The sub-concept didn&apos;t have any problem to solve hence there is no code
                    available.
                  </Typography>
                ) : (
                  <div className={classes.code}>
                    <Viewer value={submissionDetails.code} />
                  </div>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </div>
  );
};

export default SubmissionPage;
