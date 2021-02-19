import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  completedRoot: {
    maxWidth: 'auto',
    // background: theme.palette.success.light,
    border: `0.5px solid ${theme.palette.success.dark}`,
    boxShadow: `0 .5px .5px .5px ${theme.palette.success.light}`,
    color: theme.palette.success.dark,
  },
  incompleteRoot: {
    maxWidth: 'auto',
  },
}));

const SubconceptCard = ({ subconcept }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.completedRoot}>
      <CardActionArea onClick={() => history.push(`/subconcepts/${subconcept._id}`)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {subconcept.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {subconcept.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SubconceptCard;