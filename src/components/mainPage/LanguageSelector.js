import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100px',
  },
}));

const LanguageSelector = ({ languagesArray, language, setLanguage }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="select-language">Language</InputLabel>
      <Select
        labelId="select-language"
        id="select-language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        label="Language"
      >
        {languagesArray.map((data) => (
          <MenuItem key={data.value} value={data.value}>
            {data.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
