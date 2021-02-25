import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import Switch from '@material-ui/core/Switch';
import { Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline';
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Output from './Output';

const useStyles = makeStyles((theme) => ({
  editor: {
    width: '100% !important',
    borderRadius: theme.spacing(0.5),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  button: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
}));

const ReactAceCodeEditor = ({
  showSubmit,
  language,
  // placeholder = 'Placeholder Text',
  value,
  setValue,
}) => {
  const onChange = (newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  const [allowCustomInput, setAllowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState('');

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <AceEditor
            // placeholder={placeholder}
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
            className={classes.editor}
            value={value}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Output />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<PlayArrowIcon />}
          >
            run
          </Button>
          {showSubmit && (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              startIcon={<SendIcon />}
            >
              Submit
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
            rows={2}
            rowsMax={2}
            onChange={(event) => setCustomInput(event.target.value)}
            autoComplete="Input"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReactAceCodeEditor;
