import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import useRedirectUnsignedUser from '../../customHooks/useRedirectUnsignedUser';

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
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

const levels = [
  {
    title: 'Beginner',
    progress: '0',
    description: ['Basic concepts', 'Loops', 'Arrays', 'conditionals'],
    buttonText: 'get started',
    buttonVariant: 'outlined',
    path: '/beginner',
  },
  {
    title: 'Advanced',
    // subheader: 'Most popular',
    progress: '0',
    description: ['Intermediate concepts', 'OOPM', 'Functional programming', 'High level concepts'],
    buttonText: 'get started',
    buttonVariant: 'outlined',
    path: '/advanced',
  },
  {
    title: 'Expert',
    progress: '0',
    description: ['Expert level concepts', 'Time complexity', 'Space complexity', 'Code debugging'],
    buttonText: 'get started',
    buttonVariant: 'outlined',
    path: '/expert',
  },
];

const Homepage = () => {
  const classes = useStyles();
  useRedirectUnsignedUser();
  const history = useHistory();

  const handleButtonClick = (path) => {
    history.push(path);
  };

  return (
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
            <Grid item key={level.title} xs={12} sm={level.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={level.title}
                  subheader={level.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.progress}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {level.progress}%
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      &nbsp;progress
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
                <CardActions>
                  <Button
                    onClick={() => handleButtonClick(level.path)}
                    fullWidth
                    variant={level.buttonVariant}
                    color="primary"
                  >
                    {level.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Homepage;
