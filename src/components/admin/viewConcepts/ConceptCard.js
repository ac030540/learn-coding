import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    maxWidth: 'auto',
  },
});

const ConceptCard = ({ concept, setOpen, setSelectedConcept }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleEdit = () => {
    history.push(`/admin/concepts/${concept._id}/edit`);
  };

  const handleDelete = () => {
    setSelectedConcept(concept);
    setOpen(true);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {concept.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {concept.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button size="small" color="primary" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ConceptCard;
