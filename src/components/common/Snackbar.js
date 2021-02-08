import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const CustomSnackbar = () => {
  const snackbarStates = useStoreState((state) => state.snackbarStates);
  const { open, severity, message } = snackbarStates;
  const setSnackbarOpen = useStoreActions((actions) => actions.setSnackbarOpen);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
