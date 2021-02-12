import Grid from '@material-ui/core/Grid';
import FileUpload from '../../common/FileUpload';
import MarkdownEditor from '../../common/MarkdownEditor';

const CodeDetails = ({
  subconcept,
  handleAnswerChange,
  handleInputFileChange,
  handleOutputFileChange,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <MarkdownEditor value={subconcept.answer} setValue={handleAnswerChange} title="Solution" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FileUpload
          title="Input file"
          file={subconcept.inputFile}
          handleFileChange={handleInputFileChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FileUpload
          title="Output file"
          file={subconcept.outputFile}
          handleFileChange={handleOutputFileChange}
        />
      </Grid>
    </>
  );
};

export default CodeDetails;
