import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import MarkdownViewer from '../common/MarkdownViewer';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${grey[400]}`,
    borderRadius: theme.spacing(0.6),
  },
  title: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const DataBlock = ({ title, content }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h5" component="h2">
        {title}
      </Typography>
      <Divider light />
      <MarkdownViewer value={content} />
    </Card>
  );
};

export default DataBlock;
