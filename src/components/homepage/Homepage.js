import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Loading from '../common/Loading';

const levels = [
  {
    title: 'Beginner',
    value: 'Beginner',
    description: ['Basic concepts', 'Loops', 'Arrays', 'conditionals'],
  },
  {
    title: 'Advanced',
    value: 'Advanced',
    description: ['Intermediate concepts', 'OOPM', 'Functional programming', 'High level concepts'],
  },
  {
    title: 'Expert',
    value: 'Expert',
    description: ['Expert level concepts', 'Time complexity', 'Space complexity', 'Code debugging'],
  },
];

const Homepage = () => {
  const currentTheme = useTheme();
  const [progress, setProgress] = useState([0, 0, 0]);
  const smAndBelow = useMediaQuery(currentTheme.breakpoints.down('sm'));

  const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    subHeading: {
      margin: theme.spacing(2),
      marginBottom: 0,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: smAndBelow
      ? {
          padding: theme.spacing(4, 0, 4),
        }
      : {
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
          setProgress([
            Math.round(Number(data.data.Beginner)),
            Math.round(Number(data.data.Advanced)),
            Math.round(Number(data.data.Expert)),
          ]);
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
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary">
          Levels
        </Typography>
        <Typography
          className={classes.subHeading}
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          Select a level according to your comfort zone and start learning
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {levels.map((level, index) => (
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
                        {progress[index]}%
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
