import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(() => ({
  close: {
    cursor: 'pointer',
  },
}));

const PasswordField = (props) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment
            onClick={() => setShowPassword(!showPassword)}
            className={classes.close}
            position="start"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
