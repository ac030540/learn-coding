import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    borderTop: '1px solid black',
    font: `12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`,
    lineHeight: '19px',
    color: '#F8F8F2',
    backgroundColor: '#272822',
    borderRadius: '4px',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
  },
  heading: {
    backgroundColor: '#2F3129',
    padding: '10px',
  },
  output: {
    height: '100px',
    padding: '10px',
    overflow: 'scroll',
    whiteSpace: 'pre',
  },
}));

const LanguageSelector = ({ output }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.heading}>OUTPUT:</Box>
      <div className={classes.output}>{output}</div>
    </Box>
  );
};

export default LanguageSelector;
