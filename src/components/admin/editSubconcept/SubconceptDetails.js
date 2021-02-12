/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MarkdownEditor from '../../common/MarkdownEditor';
import CodeDetails from './CodeDetails';

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

export default function ConceptDetails({ subconcept, setSubconcept }) {
  const classes = useStyles();

  const handleCodingChange = (event) => {
    setSubconcept((prev) => ({
      ...prev,
      coding: event.target.value,
    }));
  };
  const handleHintChange = (event) => {
    setSubconcept((prev) => ({
      ...prev,
      hint: event.target.value,
    }));
  };
  const handleOrderChange = (event) => {
    setSubconcept((prev) => ({
      ...prev,
      order: event.target.value,
    }));
  };
  const handleTitleChange = (event) => {
    setSubconcept((prev) => ({
      ...prev,
      title: event.target.value,
    }));
  };
  const handleChangeDescription = (value) => {
    setSubconcept((prev) => ({
      ...prev,
      description: value,
    }));
  };
  const handleCodingTemplateChange = (value) => {
    setSubconcept((prev) => ({
      ...prev,
      codingTemplate: value,
    }));
  };
  const handleStoryChange = (value) => {
    setSubconcept((prev) => ({
      ...prev,
      story: value,
    }));
  };
  const handleAnswerChange = (value) => {
    setSubconcept((prev) => ({
      ...prev,
      answer: value,
    }));
  };
  const handleInputFileChange = (value) => {
    setSubconcept((prev) => ({
      ...prev,
      inputFile: value,
    }));
  };

  const handleOutputFileChange = (value) => {
    setSubconcept((prev) => ({
      ...prev,
      outputFile: value,
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
              value={subconcept.title}
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
              value={subconcept.description}
              setValue={handleChangeDescription}
              title="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <MarkdownEditor value={subconcept.story} setValue={handleStoryChange} title="Story" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              value={subconcept.hint}
              onChange={handleHintChange}
              fullWidth
              id="hint"
              label="Hint"
              name="hint"
              autoComplete="hint"
            />
          </Grid>
          <Grid item xs={12}>
            <MarkdownEditor
              value={subconcept.codingTemplate}
              setValue={handleCodingTemplateChange}
              title="Coding Template"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="order"
              label="Order"
              name="order"
              value={subconcept.order}
              onChange={handleOrderChange}
              autoComplete="order"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Coding</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={subconcept.coding}
                onChange={handleCodingChange}
                label="Coding"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {subconcept.coding && (
            <CodeDetails
              subconcept={subconcept}
              handleInputFileChange={handleInputFileChange}
              handleOutputFileChange={handleOutputFileChange}
              handleAnswerChange={handleAnswerChange}
            />
          )}
        </Grid>
      </form>
    </div>
  );
}
