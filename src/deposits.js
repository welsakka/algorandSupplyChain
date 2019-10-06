/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Your recent Item</Title>

      <Typography color="textSecondary" className={classes.depositContext}>
      XKDTBZHMJI5FHYNZN74ODEITOIXTODXMOLJZLDYUZOMDWTEV2EVQ 
      </Typography>

    </React.Fragment>
  );
}