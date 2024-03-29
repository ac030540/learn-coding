import Box from '@material-ui/core/Box';
import { useStoreState } from 'easy-peasy';
import { makeStyles } from '@material-ui/core/styles';
import { ResizableBox } from 'react-resizable';
import '../../../node_modules/react-resizable/css/styles.css';

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
    // height: '100px',
    padding: '10px',
    // overflow: 'scroll',
    // whiteSpace: 'pre',
  },
}));

const LanguageSelector = () => {
  const classes = useStyles();
  const output = useStoreState((state) => state.output);
  const status = useStoreState((state) => state.status);
  return (
    <Box className={classes.root}>
      <Box className={classes.heading}>OUTPUT:</Box>
      {JSON.stringify(status) !== '{}' && (
        <Box className={classes.heading}>
          STATUS: {status.description}, MEMORY: {status.memory}KB, TIME: {status.time}s{' '}
        </Box>
      )}
      <ResizableBox
        style={{ overflow: 'scroll', whiteSpace: 'pre' }}
        height={100}
        width={Infinity}
        axis="y"
        minConstraints={[Infinity, 100]}
        resizeHandles={['s']}
      >
        <div className={classes.output}>{output}</div>
      </ResizableBox>
    </Box>
  );
};

export default LanguageSelector;
