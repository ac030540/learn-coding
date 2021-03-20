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
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useParams } from 'react-router';
import Output from './Output';
import CustomBackdrop from './Backdrop';
import { calculateSeverity } from '../../commonFunctions';
import SubmittedDialog from './SubmittedDialog';

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
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const debug = useStoreState((state) => state.debug);
  const auth = useStoreState((state) => state.auth);
  const { subconceptId } = useParams();
  const [open, setOpen] = useState(false);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);
  const setStatus = useStoreActions((actions) => actions.setStatus);
  const setShowConfetti = useStoreActions((actions) => actions.setShowConfetti);
  const setOutput = useStoreActions((actions) => actions.setOutput);

  const handleRun = () => {
    setBackdropOpen(true);
    const formData = new FormData();
    formData.append('email', auth.email);
    formData.append('code', value);
    if (language === 'Python3') formData.append('language', 'Python3');
    else formData.append('language', 'Java');
    if (allowCustomInput) formData.append('input', customInput);

    fetch(`${process.env.REACT_APP_SERVER_URL}/submission/run`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBackdropOpen(false);
          setOutput(data.data.stdout);
          setStatus({
            description: data.data.status.description,
            time: data.data.time,
            memory: data.data.memory,
          });
          setSnackbarStates({
            open: true,
            severity: calculateSeverity(data.data.status.description),
            message: data.data.status.description,
          });
        } else {
          setBackdropOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'error',
            message: 'Error in submitting the code',
          });
        }
      })
      .catch(() => {
        setBackdropOpen(false);
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error in submitting the code',
        });
      });
  };

  const handleNormalSubmit = () => {
    setBackdropOpen(true);
    const formData = new FormData();
    formData.append('email', auth.email);
    formData.append('code', value);
    if (language === 'Python3') formData.append('language', 'Python3');
    else formData.append('language', 'Java');

    fetch(`${process.env.REACT_APP_SERVER_URL}/submission/${subconceptId}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBackdropOpen(false);
          setStatus({
            description: data.data.status.description,
            time: data.data.time,
            memory: data.data.memory,
          });
          setSnackbarStates({
            open: true,
            severity: calculateSeverity(data.data.status.description),
            message: data.data.status.description,
          });
          if (data.data.status.description === 'Accepted') {
            setShowConfetti(true);
            setOpen(true);
          }
        } else {
          setBackdropOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'error',
            message: 'Error in submitting the code',
          });
        }
      })
      .catch(() => {
        setBackdropOpen(false);
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error in submitting the code!',
        });
      });
  };

  const handleDebugSubmit = () => {
    setBackdropOpen(true);
    const formData = new FormData();
    formData.append('email', auth.email);
    formData.append('code', value);
    if (language === 'Python3') formData.append('language', 'Python3');
    else formData.append('language', 'Java');

    fetch(`${process.env.REACT_APP_SERVER_URL}/debug/${subconceptId}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBackdropOpen(false);
          setStatus({
            description: data.data.status.description,
            time: data.data.time,
            memory: data.data.memory,
          });
          setSnackbarStates({
            open: true,
            severity: calculateSeverity(data.data.status.description),
            message: data.data.status.description,
          });
          if (data.data.status.description === 'Accepted') setShowConfetti(true);
        } else {
          setBackdropOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'error',
            message: 'Error in submitting the code',
          });
        }
      })
      .catch(() => {
        setBackdropOpen(false);
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error in submitting the code!',
        });
      });
  };

  const handleSubmit = () => {
    if (debug) handleDebugSubmit();
    else handleNormalSubmit();
  };

  return (
    <Box>
      <Grid container>
        <CustomBackdrop open={backdropOpen} />
        <Grid item xs={12}>
          <AceEditor
            // placeholder={placeholder}
            mode={language === 'Python3' ? 'python' : 'java'}
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
            onClick={handleRun}
            startIcon={<PlayArrowIcon />}
          >
            run
          </Button>
          {showSubmit && (
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleSubmit}
                className={classes.button}
                startIcon={<SendIcon />}
              >
                Submit
              </Button>
              <SubmittedDialog open={open} setOpen={setOpen} />
            </>
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
