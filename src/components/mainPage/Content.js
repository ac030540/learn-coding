import Grid from '@material-ui/core/Grid';
import AccordionContent from './AccordionContent';
import DataBlock from './DataBlock';
import ReferencesBlock from './ReferencesBlock';

const Content = ({ language, subconcept }) => {
  const story = language === 'Java' ? subconcept.java.story : subconcept.python.story;
  const hint = language === 'Java' ? subconcept.java.hint : subconcept.python.hint;
  const solution = language === 'Java' ? subconcept.java.answer : subconcept.python.answer;
  const references =
    language === 'Java' ? subconcept.java.referencesId : subconcept.python.referencesId;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataBlock title="Description" content={subconcept.description} />
      </Grid>
      <Grid item xs={12}>
        <DataBlock title="Story" content={story} />
      </Grid>
      {subconcept.coding && (
        <>
          <Grid item xs={12}>
            <AccordionContent title="Hint" content={hint} />
          </Grid>
          <Grid item xs={12}>
            <AccordionContent title="Solution" content={solution} />
          </Grid>
        </>
      )}
      {(language === 'Java' && subconcept.java.referencesId.length !== 0) ||
      (language === 'Python3' && subconcept.python.referencesId.length !== 0) ? (
        <Grid item xs={12}>
          <ReferencesBlock references={references} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Content;
