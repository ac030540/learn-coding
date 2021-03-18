import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router';

export default function AlertDialog({ open, setOpen }) {
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Successfully submitted the problem</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Congratulations! You have Successfully submitted the problem. You can try other
            subconcepts to master your coding skills.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history.goBack()} color="primary" variant="outlined">
            Go Back to subconcepts
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
