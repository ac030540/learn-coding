import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import Switch from '@material-ui/core/Switch';
import { Grid, Box, Card } from '@material-ui/core';
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import reactAceCodeEditorStyles from './ReactAceCodeEditor.module.css';

const ReactAceCodeEditor = ({ language, placeholder = 'Placeholder Text', value, setValue }) => {
  const onChange = (newValue) => {
    setValue(newValue);
  };

  const [allowCustomInput, setAllowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState('');

  return (
    <Box>
      <Card>
        <AceEditor
          placeholder={placeholder}
          mode={language}
          theme="monokai"
          name="blah2"
          // onLoad={onLoad}
          onChange={onChange}
          fontSize={14}
          // width="50vw"
          // showPrintMargin
          showGutter
          highlightActiveLine
          className={`${reactAceCodeEditorStyles.editor}`}
          value={value}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </Card>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Switch
              checked={allowCustomInput}
              onChange={(event) => setAllowCustomInput(event.target.checked)}
              name="Custom Input"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Custom Input"
        />
      </FormControl>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} item>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="Input"
            label="Input"
            name="Input"
            multiline
            disabled={!allowCustomInput}
            value={customInput}
            onChange={(event) => setCustomInput(event.target.value)}
            autoComplete="Input"
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="Input"
            label="Input"
            name="Input"
            multiline
            disabled={!allowCustomInput}
            value={customInput}
            onChange={(event) => setCustomInput(event.target.value)}
            autoComplete="Input"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReactAceCodeEditor;
