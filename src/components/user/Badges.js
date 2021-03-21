import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Divider, Tooltip } from '@material-ui/core';
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
    filter: 'blur(2px)',
  },
}));

const Badges = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h5" id="title">
        Badges
      </Typography>
      <Divider />
      <Grid className={classes.content} container spacing={4}>
        <Grid item xs={4} sm={3} md={2}>
          <Tooltip title="Complete Beginner level to unlock" arrow>
            <img
              className={`${classes.badges} ${classes.blurred}`}
              src={Beginner}
              alt="Beginner badge"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Tooltip title="Complete Advanced level to unlock" arrow>
            <img
              className={`${classes.badges} ${classes.blurred}`}
              src={Advanced}
              alt="Advanced badge"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <Tooltip title="Complete Expert level to unlock" arrow>
            <img
              className={`${classes.badges} ${classes.blurred}`}
              src={Expert}
              alt="Expert badge"
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Badges;
