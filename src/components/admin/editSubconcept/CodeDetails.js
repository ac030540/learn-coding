import Grid from '@material-ui/core/Grid';
import FileDisplayer from '../../common/FileDisplayer';
import FileUpload from '../../common/FileUpload';
import MarkdownEditor from '../../common/MarkdownEditor';

const CodeDetails = ({
  subconcept,
  hideFileUpload,
  handleAnswerChange,
  handleInputFileChange,
  handleOutputFileChange,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <MarkdownEditor value={subconcept.answer} setValue={handleAnswerChange} title="Solution" />
      </Grid>
      {hideFileUpload ? (
        <>
          <Grid item xs={12} sm={6}>
            <FileDisplayer title="Input file" fileName={subconcept.inputFile} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FileDisplayer title="Output file" fileName={subconcept.outputFile} />
          </Grid>
        </>
      ) : (
        <>
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
      )}
    </>
  );
};

export default CodeDetails;
