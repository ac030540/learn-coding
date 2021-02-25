import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Card } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${grey[400]}`,
    borderRadius: theme.spacing(0.6),
  },
  title: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  chips: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    padding: theme.spacing(1),
  },
}));

const ReferencesBlock = ({ references }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h5" component="h2">
        References
      </Typography>
      <Divider light />
      <Box className={classes.chips}>
        {references.map((reference) => (
          <Chip
            key={reference._id}
            label={reference.title}
            onClick={() => window.open(reference.link, '_blank')}
          />
        ))}
      </Box>
    </Card>
  );
};

export default ReferencesBlock;
