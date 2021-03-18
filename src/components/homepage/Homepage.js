import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Loading from '../common/Loading';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.secondary.main : theme.palette.grey[700],
    color: 'white',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    // marginBottom: theme.spacing(2),
  },
  progressText: {
    marginBottom: theme.spacing(3),
  },
}));

const levels = [
  {
    title: 'Beginner',
    value: 'Beginner',
    progress: '0',
    description: ['Basic concepts', 'Loops', 'Arrays', 'conditionals'],
  },
  {
    title: 'Advanced',
    value: 'Advanced',
    progress: '0',
    description: ['Intermediate concepts', 'OOPM', 'Functional programming', 'High level concepts'],
  },
  {
    title: 'Expert',
    value: 'Expert',
    progress: '0',
    description: ['Expert level concepts', 'Time complexity', 'Space complexity', 'Code debugging'],
  },
];

const Homepage = () => {
  const classes = useStyles();
  const auth = useStoreState((state) => state.auth);
  const setLevel = useStoreActions((actions) => actions.setLevel);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const handleCardClick = (value) => {
    setLevel(value);
    history.push('/concepts');
  };

  useEffect(() => {
    // fetching the data of progress
    fetch(`${process.env.REACT_APP_SERVER_URL}/track/?email=${auth.email}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          levels[0].progress = data.data.Beginner;
          levels[1].progress = data.data.Advanced;
          levels[2].progress = data.data.Expert;
          setLoading(false);
        }
      });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Levels
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Select a level according to your comfort zone and start learning
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {levels.map((level) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={level.title} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(level.value)}>
                  <CardHeader
                    title={level.title}
                    subheader={level.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.progress}>
                      <Typography component="h2" variant="h3" color="secondary">
                        {level.progress}%
                      </Typography>
                    </div>
                    <div className={classes.progress}>
                      <Typography
                        className={classes.progressText}
                        variant="body2"
                        color="textSecondary"
                      >
                        PROGRESS
                      </Typography>
                    </div>
                    <ul>
                      {level.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Homepage;
