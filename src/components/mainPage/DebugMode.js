import FormControl from '@material-ui/core/FormControl';
import { useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { useParams } from 'react-router';
import { useStoreState, useStoreActions } from 'easy-peasy';

const useStyles = makeStyles((theme) => ({
  debug: {
    marginTop: theme.spacing(1),
  },
  refresh: {
    marginTop: theme.spacing(0.5),
  },
}));

const DebugMode = ({ language }) => {
  const classes = useStyles();
  const debug = useStoreState((state) => state.debug);
  const auth = useStoreState((state) => state.auth);
  const setDebug = useStoreActions((actions) => actions.setDebug);
  const { subconceptId } = useParams();

  const fetchAndUpdateCode = () => {
    const formData = new FormData();
    formData.append('email', auth.email);
    formData.append('language', language);
    fetch(`${process.env.REACT_APP_SERVER_URL}/debug/${subconceptId}/${auth.email}/${language}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    if (debug) {
      fetchAndUpdateCode();
    }
  }, [debug]);

  return (
    <>
      {debug && (
        <Tooltip title="Load new code">
          <IconButton
            onClick={fetchAndUpdateCode}
            color="secondary"
            className={classes.refresh}
            aria-label="refresh"
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
      <FormControl className={classes.debug} component="fieldset">
        <FormControlLabel
          control={
            <Switch
              checked={debug}
              onChange={(event) => setDebug(event.target.checked)}
              name="Debug Mode"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Debug Mode"
        />
      </FormControl>
    </>
  );
};

export default DebugMode;
