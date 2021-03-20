import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStoreState } from 'easy-peasy';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import SubmissionsTable from './SubmissionsTable';
import Loading from '../common/Loading';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [submissions, setSubmissions] = useState([]);
  const { page: pageNumber } = queryString.parse(location.search);
  const auth = useStoreState((state) => state.auth);
  const [page, setPage] = useState(pageNumber ? Number(pageNumber) : 0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/submission/user/${auth.id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubmissions(data.data);
          setLoading(false);
        }
      });
  }, [page, rowsPerPage]);

  return loading ? (
    <Loading />
  ) : (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          {auth.firstName} {auth.lastName}
        </Typography>
        <Typography component="h1" variant="body2">
          {auth.email}
        </Typography>
      </div>
      <SubmissionsTable
        page={page}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        submissions={submissions}
      />
    </Container>
  );
};

export default Profile;
