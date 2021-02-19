import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import UserSubconceptsCard from './UserSubconceptsCard';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const SubUserSubconceptsCardsArray = ({ subconcepts }) => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.root} container spacing={3}>
        {subconcepts.map((subconcept) => (
          <Grid item xs={12} key={subconcept._id}>
            <UserSubconceptsCard subconcept={subconcept} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SubUserSubconceptsCardsArray;
