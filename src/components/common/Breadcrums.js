import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  lastElement: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  otherElements: {
    cursor: 'pointer',
  },
}));

export default function ActiveLastBreadcrumb({ data }) {
  const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {data.map((element, index) => (
        <Link
          key={element.text}
          onClick={element.onClick ? element.onClick : null}
          color={index === data.length - 1 ? 'textPrimary' : 'inherit'}
          className={index === data.length - 1 ? classes.lastElement : classes.otherElements}
          href={element.link ? element.link : null}
          aria-current={index === data.length - 1 ? 'page' : null}
        >
          {element.text}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
