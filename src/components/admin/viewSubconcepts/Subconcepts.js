import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStoreState } from 'easy-peasy';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { useHistory, useParams } from 'react-router';
import Loading from '../../common/Loading';
import Breadcrumbs from '../../common/Breadcrums';
import SubconceptCardsArray from './SubconceptCardsArray';
import UserSubconceptsCardArray from '../../subconcepts/UserSubconceptsCardArray';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  titleWrapper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  breadcrumbs: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Subconcepts = ({ userRoute }) => {
  const [subconcepts, setSubconcepts] = useState({});
  const [loading, setLoading] = useState(true);
  const level = useStoreState((state) => state.level);
  const [updated, setUpdated] = useState(false);
  const [conceptTitle, setConceptTitle] = useState('');
  // const setLevel = useStoreActions((actions) => actions.setLevel);
  const classes = useStyles();
  const history = useHistory();
  const { conceptId } = useParams();

  const breadcrumbsData = [
    {
      text: level,
      onClick: () => {
        if (!userRoute) history.push('/admin/concepts');
        else history.push('/concepts');
      },
    },
    {
      text: conceptTitle,
    },
  ];

  useEffect(() => {
    // fetching the data of the concepts
    fetch(`${process.env.REACT_APP_SERVER_URL}/subConcept/concept/${conceptId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubconcepts(data);
          setConceptTitle(data.data.concept.title);
          setLoading(false);
        }
      });
  }, [level, updated]);

  return loading ? (
    <Loading />
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="md">
        <div className={classes.titleWrapper}>
          <Avatar className={classes.avatar}>
            <CodeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sub-concepts
          </Typography>
        </div>
        {!userRoute && (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => history.push(`/admin/concepts/${conceptId}/create`)}
          >
            Add subconcept
          </Button>
        )}
        <Box className={classes.breadcrumbs}>
          <Breadcrumbs data={breadcrumbsData} />
        </Box>
        {userRoute ? (
          <UserSubconceptsCardArray subconcepts={subconcepts.data.result} />
        ) : (
          <SubconceptCardsArray setUpdated={setUpdated} subconcepts={subconcepts.data.result} />
        )}
      </Container>
    </div>
  );
};

export default Subconcepts;
