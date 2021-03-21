import React from 'react';
import Card from '@material-ui/core/Card';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
  },
}));

const CardContainer = ({ children, title = 'Title' }) => {
  const classes = useStyles();
  return (
    <Card>
      <Typography className={classes.title} variant="h5" color="primary" component="h2">
        {title}
      </Typography>
      <Divider />
      <CardContent> {children} </CardContent>
    </Card>
  );
};

export default CardContainer;
