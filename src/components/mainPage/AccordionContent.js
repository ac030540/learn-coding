import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { Divider, Card } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MarkdownViewer from '../common/MarkdownViewer';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    border: `1px solid ${grey[400]}`,
    borderRadius: theme.spacing(0.6),
    background: 'none',
  },
  accordionSummary: {
    marginBottom: 'none',
  },
  title: {
    marginBottom: 'none',
    // fontSize: theme.typography.pxToRem(15),
    // fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AccordionContent = ({ title, content }) => {
  const classes = useStyles();
  return (
    <Card>
      <Accordion className={classes.root}>
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={title}
          id={title}
        >
          <Typography variant="h5" component="h2" className={classes.title}>
            {title}
          </Typography>
        </AccordionSummary>
        <Divider light />
        <AccordionDetails>
          <MarkdownViewer value={content} />
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default AccordionContent;
