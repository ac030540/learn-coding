import { Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NoDataImage from '../../assets/undraw_not_found.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: theme.spacing(4),
  },
  image: {
    height: 'auto',
    width: '50%',
  },
  text: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
}));
const NoData = ({ text = 'No data found' }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="sm">
      <Box className={classes.text}>
        <img className={classes.image} src={NoDataImage} alt="No data Found" />
      </Box>
      <Box className={classes.text}>
        <Typography color="secondary" variant="h5">
          {text}
        </Typography>
      </Box>
    </Container>
  );
};

export default NoData;
