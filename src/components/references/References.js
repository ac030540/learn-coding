import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router';
import BookIcon from '@material-ui/icons/Book';
import Avatar from '@material-ui/core/Avatar';
import { CssBaseline, TextField, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import ReferenceCard from './ReferenceCard';
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
  pagination: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    justifyContent: 'center',
  },
}));

const References = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { page: pageNumber } = queryString.parse(location.search);
  const [page, setPage] = useState(pageNumber ? Number(pageNumber) : 1);
  const history = useHistory();
  const [showPagination, setShowPagination] = useState(true);
  const [references, setReferences] = useState([]);

  // const [updatedReferences, setUpdatedReferences] = useState([]);
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      // searching when enter key is pressed
      fetch(`${process.env.REACT_APP_SERVER_URL}/references/search?input=${search}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setShowPagination(false);
            setReferences(data.data);
            setLoading(false);
          }
        });
    }
  };

  const handlePageChange = (e, updatedPage) => {
    history.push({
      pathname: '/references',
      search: `?page=${updatedPage}`,
    });
    setPage(updatedPage);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getPageData = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/references?page=${page}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // setUpdatedReferences(data.data);
          setShowPagination(true);
          setReferences(data.data);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    // get data of the page when there is change in page number or on initial load
    getPageData();
  }, [page]);

  useEffect(() => {
    // get page data when the search box is empty
    if (search.length === 0) getPageData();
  }, [search]);

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
            onKeyPress={handleSearch}
            onChange={handleSearchChange}
            fullWidth
            autoFocus
            id="search"
            label="Search"
            name="search"
            autoComplete="search"
          />
        </div>
        <ReferenceCard references={references} />
        {showPagination && (
          <Box className={classes.pagination}>
            <Pagination page={page} onChange={handlePageChange} count={10} color="secondary" />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default References;
