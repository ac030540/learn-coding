import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BookIcon from '@material-ui/icons/Book';
import Avatar from '@material-ui/core/Avatar';
import { CssBaseline, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Chips from './Chips';
import Loading from '../common/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  searchBar: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const References = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [references, setReferences] = useState([]);
  const [updatedReferences, setUpdatedReferences] = useState([]);
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setUpdatedReferences(() =>
      references.filter((reference) => reference.title.toLowerCase().includes(value))
    );
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/references`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUpdatedReferences(data.data);
          setReferences(data.data);
          setLoading(false);
        }
      });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="md">
        <div className={classes.titleWrapper}>
          <Avatar className={classes.avatar}>
            <BookIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            References
          </Typography>
          <TextField
            variant="outlined"
            required
            className={classes.searchBar}
            value={search}
            onChange={handleSearchChange}
            fullWidth
            id="search"
            label="Search"
            name="search"
            autoComplete="search"
          />
        </div>
        <Chips references={updatedReferences} />
      </Container>
    </div>
  );
};

export default References;
