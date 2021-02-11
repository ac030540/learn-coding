import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ConceptCard from './ConceptCard';
import CustomDialog from '../../common/Dialog';
// import CustomBackdrop from '../../common/Backdrop';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const ConceptCardsArray = ({ concepts }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState({});
  // const [backdropOpen, setBackdropOpen] = useState(false);
  const auth = useStoreState((state) => state.auth);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);

  const handleAccept = () => {
    // setBackdropOpen(true);
    const formData = new FormData();
    formData.append('email', auth.email);

    fetch(`${process.env.REACT_APP_SERVER_URL}/concept/${selectedConcept._id}`, {
      method: 'DELETE',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // setBackdropOpen(false);
          setOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'success',
            message: 'Successfully deleted the concept',
          });
        } else {
          // setBackdropOpen(false);
          setOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'error',
            message: 'Error in deleting the concept',
          });
        }
      })
      .catch(() => {
        // setBackdropOpen(false);
        setOpen(false);
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error in deleting the concept',
        });
      });
  };

  return (
    <>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        message="Are you sure want to delete the concept?"
        title="Delete confirmation"
        handleAccept={handleAccept}
      />
      {/* <CustomBackdrop open={backdropOpen} /> */}
      <Grid className={classes.root} container spacing={3}>
        {concepts.map((concept) => (
          <Grid item xs={12} key={concept._id}>
            <ConceptCard
              concept={concept}
              setSelectedConcept={setSelectedConcept}
              setOpen={setOpen}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ConceptCardsArray;
