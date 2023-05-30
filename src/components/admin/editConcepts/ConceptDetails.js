import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MarkdownEditor from '../../common/MarkdownEditor';

const useStyles = makeStyles((theme) => ({
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

  const handleChange = (value, key) => {
    setConcept((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={classes.paper}>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              value={concept.title}
              onChange={(e) => handleChange(e.target.value, 'title')}
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
              setValue={(value) => handleChange(value, 'description')}
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
                onChange={(e) => handleChange(e.target.value, 'category')}
                label="Category"
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
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
              onChange={(e) => handleChange(e.target.value, 'order')}
              autoComplete="order"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
