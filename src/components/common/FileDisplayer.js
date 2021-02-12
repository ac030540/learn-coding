/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
  root: {
    outline: 'none',
    cursor: 'pointer',
    padding: theme.spacing(2),
    border: '1px solid #808080',
    borderColor: grey[400],
    color: theme.palette.text.secondary,
    '&:hover': {
      border: '1px solid black',
      borderColor: theme.palette.text.primary,
    },
    '&:focus': {
      color: theme.palette.primary.main,
      border: '1px solid #3f51b5',
      borderColor: theme.palette.primary,
    },
  },
  fileName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const FileDisplayer = ({ title, fileName }) => {
  const classes = useStyles();
  return (
    <Paper
      onClick={() => window.open(fileName, '_blank')}
      tabIndex="0"
      variant="outlined"
      className={classes.root}
    >
      <Typography component="h1" variant="body1" className={classes.title}>
        {title}
      </Typography>
      <Typography component="h1" variant="body2" className={classes.fileName}>
        {fileName}
      </Typography>
    </Paper>
  );
};

export default FileDisplayer;
