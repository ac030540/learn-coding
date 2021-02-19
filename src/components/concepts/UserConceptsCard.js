import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    maxWidth: 'auto',
  },
});

const ConceptCard = ({ concept }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push(`/concepts/${concept._id}`)}>
        <LinearProgress variant="determinate" value="30" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {concept.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {concept.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ConceptCard;
