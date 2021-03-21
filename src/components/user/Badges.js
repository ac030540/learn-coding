import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useStoreState } from 'easy-peasy';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Divider, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Beginner from '../../assets/Beginner.svg';
import Advanced from '../../assets/Advanced.svg';
import Expert from '../../assets/Expert.svg';
import Backdrop from '../common/Backdrop';

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
  const auth = useStoreState((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [showBeginner, setShowBeginner] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showExpert, setShowExpert] = useState(false);
  useEffect(() => {
    // fetching the data of progress
    fetch(`${process.env.REACT_APP_SERVER_URL}/track/?email=${auth.email}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShowBeginner(data.data.Beginner === 100);
          setShowAdvanced(data.data.Advanced === 100);
          setShowExpert(data.data.Expert === 100);
          setLoading(false);
        }
      });
  }, []);

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h5" id="title">
        Badges
      </Typography>
      <Divider />
      <Backdrop open={loading} />
      <Grid className={classes.content} container spacing={4}>
        <Grid item xs={4} sm={3} md={2}>
          {showBeginner ? (
            <img className={`${classes.badges}`} src={Beginner} alt="Beginner badge" />
          ) : (
            <Tooltip title="Complete Beginner level to unlock" arrow>
              <img
                className={`${classes.badges} ${classes.blurred}`}
                src={Beginner}
                alt="Beginner badge"
              />
            </Tooltip>
          )}
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          {showAdvanced ? (
            <img className={`${classes.badges}`} src={Advanced} alt="Advanced badge" />
          ) : (
            <Tooltip title="Complete Advanced level to unlock" arrow>
              <img
                className={`${classes.badges} ${classes.blurred}`}
                src={Advanced}
                alt="Advanced badge"
              />
            </Tooltip>
          )}
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          {showExpert ? (
            <img className={`${classes.badges}`} src={Expert} alt="Expert badge" />
          ) : (
            <Tooltip title="Complete Expert level to unlock" arrow>
              <img
                className={`${classes.badges} ${classes.blurred}`}
                src={Expert}
                alt="Expert badge"
              />
            </Tooltip>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default Badges;
