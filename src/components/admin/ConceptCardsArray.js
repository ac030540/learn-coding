import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ConceptCard from './ConceptCard';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const ConceptCardsArray = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item xs={12}>
        <ConceptCard />
      </Grid>
      <Grid item xs={12}>
        <ConceptCard />
      </Grid>
      <Grid item xs={12}>
        <ConceptCard />
      </Grid>
    </Grid>
  );
};

export default ConceptCardsArray;
