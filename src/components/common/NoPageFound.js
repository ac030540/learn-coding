import { Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NoPageFoundImage from '../../assets/undraw_page_not_found.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  image: {
    height: 'auto',
    width: '100%',
  },
  text: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
}));
const NoPageFound = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="sm">
      <img className={classes.image} src={NoPageFoundImage} alt="No data Found" />
      <Box className={classes.text}>
        <Typography color="secondary" variant="h4">
          Page not found
        </Typography>
      </Box>
    </Container>
  );
};

export default NoPageFound;
