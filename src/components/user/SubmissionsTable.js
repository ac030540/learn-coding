import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link, useHistory } from 'react-router-dom';

const columns = [
  { id: '#', label: '#', minWidth: 100, align: 'center' },
  { id: 'language', label: 'Language', minWidth: 100, align: 'center' },
  { id: 'level', label: 'Level', minWidth: 100, align: 'center' },
  { id: 'concept', label: 'Concept', minWidth: 100, align: 'center' },
  { id: 'subconcept', label: 'Sub-Concept', minWidth: 100, align: 'center' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

export default function SubmissionsTable({
  submissions,
  page,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  totalEntries,
}) {
  const classes = useStyles();
  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    history.push({
      pathname: '/profile',
      search: `?page=${newPage}`,
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={submission._id}>
                  <TableCell align="center">
                    <Link className={classes.link} to={`/submission/${submission._id}`}>
                      {submission._id.substr(submission._id.length - 5)}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{submission.language}</TableCell>
                  <TableCell align="center">{submission.conceptId.category}</TableCell>
                  <TableCell align="center">
                    <Link
                      className={classes.link}
                      to={`/concepts/${submission.subConceptId.conceptId}`}
                    >
                      {submission.conceptId.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      className={classes.link}
                      to={`/subconcepts/${submission.subConceptId._id}`}
                    >
                      {submission.subConceptId.title}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={totalEntries} // total rows
        rowsPerPage={rowsPerPage} // limit
        page={page} // page number
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
