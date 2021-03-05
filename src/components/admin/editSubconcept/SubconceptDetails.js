/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MarkdownEditor from '../../common/MarkdownEditor';
import CodeDetails from './CodeDetails';
import AutoComplete from '../../common/AutoComplete';
import CustomBackdrop from '../../common/Backdrop';

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
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // fetching the data of the concepts
    fetch(`${process.env.REACT_APP_SERVER_URL}/references`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOptions(data.data);
          setLoading(false);
        }
      });
  }, []);

  const handleEditorChange = (value, key) => {
    setSubconcept((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTextChange = (event, key) => {
    setSubconcept((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  return (
    <>
      {loading ? (
        <CustomBackdrop open={loading} />
      ) : (
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
                  onChange={(event) => handleTextChange(event, 'title')}
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
                  setValue={(value) => handleEditorChange(value, 'description')}
                  title="Description"
                />
              </Grid>
              <Grid item xs={12}>
                <MarkdownEditor
                  value={subconcept.story}
                  setValue={(value) => handleEditorChange(value, 'story')}
                  title="Story"
                />
              </Grid>
              <Grid item xs={12}>
                <MarkdownEditor
                  value={subconcept.codingTemplate}
                  setValue={(value) => handleEditorChange(value, 'codingTemplate')}
                  title="Coding Template"
                />
              </Grid>
              <Grid item xs={12}>
                <AutoComplete
                  title="References"
                  options={options}
                  value={subconcept.referencesId}
                  setValue={(value) => handleEditorChange(value, 'referencesId')}
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
                  onChange={(event) => handleTextChange(event, 'order')}
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
                    onChange={(event) => handleTextChange(event, 'coding')}
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
                  handleTextChange={handleTextChange}
                  handleInputFileChange={(value) => handleEditorChange(value, 'inputFile')}
                  handleOutputFileChange={(value) => handleEditorChange(value, 'outputFile')}
                  handleAnswerChange={(value) => handleEditorChange(value, 'answer')}
                />
              )}
            </Grid>
          </form>
        </div>
      )}
    </>
  );
}
