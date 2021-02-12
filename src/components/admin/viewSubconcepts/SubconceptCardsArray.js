import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreState, useStoreActions } from 'easy-peasy';
import SubconceptCard from './SubconceptCard';
import CustomDialog from '../../common/Dialog';
// import CustomBackdrop from '../../common/Backdrop';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const SubsubconceptCardsArray = ({ subconcepts, setUpdated }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedSubconcept, setSelectedSubconcept] = useState({});
  // const [backdropOpen, setBackdropOpen] = useState(false);
  const auth = useStoreState((state) => state.auth);
  const setSnackbarStates = useStoreActions((actions) => actions.setSnackbarStates);

  const handleAccept = () => {
    // setBackdropOpen(true);
    const formData = new FormData();
    formData.append('email', auth.email);
    fetch(`${process.env.REACT_APP_SERVER_URL}/subconcept/${selectedSubconcept._id}`, {
      method: 'DELETE',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // setBackdropOpen(false);
          setUpdated((value) => !value);
          setOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'success',
            message: 'Successfully deleted the sub-concept',
          });
        } else {
          // setBackdropOpen(false);
          setOpen(false);
          setSnackbarStates({
            open: true,
            severity: 'error',
            message: 'Error in deleting the sub-concept',
          });
        }
      })
      .catch(() => {
        // setBackdropOpen(false);
        setOpen(false);
        setSnackbarStates({
          open: true,
          severity: 'error',
          message: 'Error in deleting the sub-concept',
        });
      });
  };

  return (
    <>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        message="Are you sure want to delete the sub-concept?"
        title="Delete confirmation"
        handleAccept={handleAccept}
      />
      {/* <CustomBackdrop open={backdropOpen} /> */}
      <Grid className={classes.root} container spacing={3}>
        {subconcepts.map((subconcept) => (
          <Grid item xs={12} key={subconcept._id}>
            <SubconceptCard
              subconcept={subconcept}
              setSelectedSubconcept={setSelectedSubconcept}
              setOpen={setOpen}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SubsubconceptCardsArray;
