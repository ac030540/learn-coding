import Grid from '@material-ui/core/Grid';
import AccordionContent from './AccordionContent';
import DataBlock from './DataBlock';
import ReferencesBlock from './ReferencesBlock';

const Content = ({ language, subconcept }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataBlock title="Description" content={subconcept.description} />
      </Grid>
      {subconcept.coding && (
        <>
          <Grid item xs={12}>
            <DataBlock
              title="Story"
              content={language === 'java' ? subconcept.java.story : subconcept.python.story}
            />
          </Grid>
          <Grid item xs={12}>
            <AccordionContent
              title="Hint"
              content={language === 'java' ? subconcept.java.hint : subconcept.python.hint}
            />
          </Grid>
          <Grid item xs={12}>
            <AccordionContent
              title="Solution"
              content={language === 'java' ? subconcept.java.answer : subconcept.python.answer}
            />
          </Grid>
        </>
      )}
      {(language === 'java' && subconcept.java.referencesId.length !== 0) ||
      (language === 'python' && subconcept.python.referencesId.length !== 0) ? (
        <Grid item xs={12}>
          <ReferencesBlock
            references={
              language === 'java' ? subconcept.java.referencesId : subconcept.python.referencesId
            }
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Content;
