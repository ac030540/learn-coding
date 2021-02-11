import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const LevelSelector = ({ level, setLevel }) => {
  const classes = useStyles();
  const handleClick = (label) => {
    if (label === 'Beginner' && level !== 'Beginner') {
      setLevel('Beginner');
    } else if (label === 'Advanced' && level !== 'Advanced') {
      setLevel('Advanced');
    } else if (label === 'Expert' && level !== 'Expert') {
      setLevel('Expert');
    }
  };

  return (
    <div className={classes.root}>
      <Chip
        label="Beginner"
        color="secondary"
        variant={level === 'Beginner' ? 'default' : 'outlined'}
        onClick={() => handleClick('Beginner')}
      />
      <Chip
        label="Advanced"
        color="secondary"
        variant={level === 'Advanced' ? 'default' : 'outlined'}
        onClick={() => handleClick('Advanced')}
      />
      <Chip
        label="Expert"
        color="secondary"
        variant={level === 'Expert' ? 'default' : 'outlined'}
        onClick={() => handleClick('Expert')}
      />
    </div>
  );
};

export default LevelSelector;
