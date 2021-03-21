import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Beginner from '../../assets/Beginner.svg';
import Advanced from '../../assets/Advanced.svg';
import Expert from '../../assets/Expert.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    // overflowY: 'hidden',
    // height: '90vh',
  },
  title: {
    flex: '1 1 100%',
    width: '100%',
    padding: theme.spacing(2),
    // paddingRight: theme.spacing(1),
    color: theme.palette.primary.main,
    // backgroundColor: lighten(theme.palette.text.primary, 0.5),
  },
  content: {
    padding: theme.spacing(2),
  },
  badges: {
    width: '100%',
    height: 'auto',
  },
  blurred: {
    filter: 'blur(3px)',
  },
}));

const SubmissionPage = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h5" id="title">
        Badges
      </Typography>
      <Divider />
      <Grid className={classes.content} container spacing={4}>
        <Grid item xs={4} sm={3} md={2}>
          <img className={classes.badges} src={Beginner} alt="Beginner badge" />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <img className={classes.badges} src={Advanced} alt="Advanced badge" />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <img className={classes.badges} src={Expert} alt="Expert badge" />
        </Grid>
      </Grid>
    </Card>
  );
};

export default SubmissionPage;
