import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MarkdownEditor from '../../common/MarkdownEditor';

const CodeDetails = ({ subconcept, handleAnswerChange }) => {
  return (
    <>
      <Grid item xs={12}>
        <MarkdownEditor value={subconcept.answer} setValue={handleAnswerChange} title="Solution" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="order"
          label="Order"
          name="order"
          value={subconcept.answer}
          onChange={handleAnswerChange}
          autoComplete="order"
        />
      </Grid>
    </>
  );
};

export default CodeDetails;
