import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/DeveloperMode';
import Avatar from '@material-ui/core/Avatar';
import { CssBaseline } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ReactAceCodeEditor from '../common/ReactAceCodeEditor';
import LanguageSelector from '../mainPage/LanguageSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  LanguageSelector: {
    marginBottom: theme.spacing(2),
  },
}));

const Editor = () => {
  const classes = useStyles();
  const [language, setLanguage] = useState('python');
  const [value, setValue] = useState('');
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="md">
        <div className={classes.titleWrapper}>
          <Avatar className={classes.avatar}>
            <CodeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Code Editor
          </Typography>
        </div>
        <div className={classes.LanguageSelector}>
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>
        <ReactAceCodeEditor value={value} setValue={setValue} language={language} />
      </Container>
    </div>
  );
};

export default Editor;
