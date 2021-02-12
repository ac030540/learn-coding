import * as React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import PropTypes from 'prop-types';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
  root: {
    // border-radius: '.25em',
    border: '1px solid #808080',
    borderColor: grey[400],
    color: theme.palette.text.secondary,
    '&:hover': {
      border: '1px solid black',
      borderColor: theme.palette.text.primary,
    },
    '&:focus-within': {
      color: theme.palette.primary.main,
      border: '1px solid #3f51b5',
      borderColor: theme.palette.primary,
    },
  },
  title: {
    padding: theme.spacing(2),
  },
}));

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

const Editor = ({ value, setValue, title }) => {
  // Initialize a markdown parser
  const mdParser = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {
          return '';
        }
      }
      return '';
    },
  });

  // Finish!
  const handleEditorChange = ({ text }) => {
    setValue(text);
  };

  const renderHTML = (text) => mdParser.render(text);
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography component="h1" variant="body1" className={classes.title}>
        {title}
      </Typography>
      <MdEditor
        value={value}
        name="textarea"
        renderHTML={renderHTML}
        onChange={handleEditorChange}
        config={{
          view: {
            menu: true,
            md: true,
            html: true,
          },
          canView: {
            hideMenu: true,
            menu: true,
            md: true,
            html: true,
            fullScreen: true,
          },
          // imageAccept: '.jpg,.png,.jpeg',
          // htmlClass: 'custom-html-style',
          syncSrollMode: ['rightFollowLeft', 'leftFollowRight'],
          // markdownClass: "ba bw2 ma0 pa0",
        }}
      />
    </Paper>
  );
};

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Editor;
