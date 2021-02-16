import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import Switch from '@material-ui/core/Switch';
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ReactAceCodeEditor = ({ language, placeholder = 'Placeholder Text', value, setValue }) => {
  const onChange = (newValue) => {
    setValue(newValue);
  };

  const [allowCustomInput, setAllowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState('');

  return (
    <>
      <AceEditor
        placeholder={placeholder}
        mode={language}
        theme="monokai"
        name="blah2"
        // onLoad={onLoad}
        onChange={onChange}
        fontSize={14}
        width="50vw"
        height="93vh"
        showPrintMargin
        showGutter
        highlightActiveLine
        value={value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
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
      {allowCustomInput ? (
        <TextField
          variant="outlined"
          required
          fullWidth
          id="Input"
          label="Input"
          name="Input"
          multiline
          value={customInput}
          onChange={(event) => setCustomInput(event.target.value)}
          autoComplete="Input"
        />
      ) : null}
    </>
  );
};

export default ReactAceCodeEditor;
