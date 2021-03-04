import { makeStyles } from '@material-ui/core/styles';
// import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
  box: {
    border: `1px solid ${grey[400]}`,
    borderRadius: '4px',
    cursor: 'pointer',
  },
}));

const Chips = ({ references }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {references.map((reference) => (
        <div
          role="presentation"
          key={reference._id}
          onClick={() => window.open(reference.link, '_blank')}
          className={classes.box}
        >
          <ListItem dense>
            <ListItemText primary={reference.title} secondary={reference.link} />
          </ListItem>
        </div>
      ))}
    </div>
  );
};

export default Chips;
