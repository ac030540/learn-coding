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
import AutoComplete from './AutoComplete';

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

export default function ConceptDetails({
  subconcept,
  setSubconcept,
  hideFileUpload,
  language,
  setLanguage,
}) {
  const classes = useStyles();

  const handleChange = (value, key) => {
    setSubconcept((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="language-selector">Language</InputLabel>
                <Select
                  labelId="language-selector"
                  id="language-select-outlined"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  label="Language"
                >
                  <MenuItem value="Python3">Python</MenuItem>
                  <MenuItem value="Java">Java</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={subconcept.title}
                onChange={(event) => handleChange(event.target.value, 'title')}
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
                setValue={(value) => handleChange(value, 'description')}
                title="Description"
              />
            </Grid>
            <Grid item xs={12}>
              <MarkdownEditor
                value={subconcept.story}
                setValue={(value) => handleChange(value, 'story')}
                title="Story"
              />
            </Grid>
            <Grid item xs={12}>
              <MarkdownEditor
                value={subconcept.codingTemplate}
                setValue={(value) => handleChange(value, 'codingTemplate')}
                title="Coding Template"
              />
            </Grid>
            <Grid item xs={12}>
              <AutoComplete
                title="References"
                value={subconcept.referencesId}
                setValue={(value) => handleChange(value, 'referencesId')}
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
                onChange={(event) => handleChange(event.target.value, 'order')}
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
                  onChange={(event) => handleChange(event.target.value, 'coding')}
                  label="Coding"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {subconcept.coding && (
              <CodeDetails
                hideFileUpload={hideFileUpload}
                subconcept={subconcept}
                handleTextChange={handleChange}
                handleInputFileChange={(value) => handleChange(value, 'inputFile')}
                handleOutputFileChange={(value) => handleChange(value, 'outputFile')}
                handleAnswerChange={(value) => handleChange(value, 'answer')}
              />
            )}
          </Grid>
        </form>
      </div>
    </>
  );
}
