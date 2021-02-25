import Box from '@material-ui/core/Box';
import { useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '../common/Breadcrums';

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

const MainPageBreadcrums = ({ subconcept, adminRoute }) => {
  const level = useStoreState((state) => state.level);
  const history = useHistory();
  const breadcrumbsData = [
    {
      text: level,
      onClick: () => {
        if (adminRoute) history.push('/admin/concepts');
        else history.push('/concepts');
      },
    },
    {
      text: subconcept.conceptId.title,
      onClick: () => {
        if (adminRoute) history.push(`/admin/concepts/${subconcept.conceptId._id}`);
        else history.push(`/concepts/${subconcept.conceptId._id}`);
      },
    },
    {
      text: subconcept.title,
    },
  ];
  const classes = useStyles();
  return (
    <Box className={classes.breadcrumbs}>
      <Breadcrumbs data={breadcrumbsData} />
    </Box>
  );
};

export default MainPageBreadcrums;
