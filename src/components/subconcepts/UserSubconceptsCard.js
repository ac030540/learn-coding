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
  'span + span:last-child': {
    '&::before': {
      content: ' and ',
    },
  },
  'span:nth-of-type(n + 2):not(:last-child)': {
    '&::before': {
      content: ', ',
    },
  },
}));

const SubconceptCard = ({ subconcept }) => {
  const classes = useStyles();
  const history = useHistory();
  const languages = [];
  if (subconcept.python.story && subconcept.python.story.trim()) languages.push('Python');
  if (subconcept.java.story && subconcept.java.story.trim()) languages.push('Java');

  return (
    <Card className={subconcept.solved ? classes.completedRoot : ''}>
      <CardActionArea onClick={() => history.push(`/subconcepts/${subconcept._id}`)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {subconcept.title}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {subconcept.description}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Languages :&nbsp;
            {languages.join(', ')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SubconceptCard;
