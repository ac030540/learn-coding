// eslint-disable-next-line import/prefer-default-export
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
