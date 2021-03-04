export const calculateSeverity = (description) => {
  if (description === 'Accepted') return 'success';
  if (
    description === 'Wrong Answer' ||
    description === 'Internal Error' ||
    description === 'Exec Format Error' ||
    description === 'Compilation Error'
  )
    return 'error';
  return 'warning';
};

export const makeLanguagesArray = (subconcept) => {
  const array = [];
  if (subconcept.python.story && subconcept.python.story.trim())
    array.push({ label: 'Python', value: 'python' });
  if (subconcept.java.story && subconcept.java.story.trim())
    array.push({ label: 'Java', value: 'java' });
  return array;
};
