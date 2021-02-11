import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MarkdownEditor from '../../common/MarkdownEditor';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ConceptDetails({ concept, setConcept }) {
  const classes = useStyles();

  const handleCategoryChange = (event) => {
    setConcept((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };
  const handleOrderChange = (event) => {
    setConcept((prev) => ({
      ...prev,
      order: event.target.value,
    }));
  };
  const handleTitleChange = (event) => {
    setConcept((prev) => ({
      ...prev,
      title: event.target.value,
    }));
  };
  const handleChangeDescription = (value) => {
    setConcept((prev) => ({
      ...prev,
      description: value,
    }));
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Contest
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={concept.title}
                onChange={handleTitleChange}
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
              />
            </Grid>
            <Grid item xs={12}>
              <MarkdownEditor
                value={concept.description}
                setValue={handleChangeDescription}
                title="Description"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={concept.category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value={10}>Beginner</MenuItem>
                  <MenuItem value={20}>Advanced</MenuItem>
                  <MenuItem value={30}>Expert</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="order"
                label="Order"
                name="order"
                value={concept.order}
                onChange={handleOrderChange}
                autoComplete="order"
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
