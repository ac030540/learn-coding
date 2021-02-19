import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import UserConceptsCard from './UserConceptsCard';
// import CustomBackdrop from '../../common/Backdrop';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const UserConceptCardsArray = ({ concepts }) => {
  const classes = useStyles();
  console.log(concepts);
  return (
    <>
      <Grid className={classes.root} container spacing={3}>
        {concepts.map((concept) => (
          <Grid item xs={12} key={concept._id}>
            <UserConceptsCard concept={concept} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UserConceptCardsArray;
