/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, 'Routers', '537URFEXANB7M6UVND6WDM75DPRRORDXWFLSOG7EGILSKDIU4T32N4KAN4', 'Comcast manufacturer, CA, United States'),
  createData(1, 'Yeezys', 'BKF5DHYIOPUIYFXU6IZ2MXY4QIXZ6337RZAM52Q2CWOBDFV45RWY5BLLEQ', 'Adidas manufacturer, Munich, Germany'),
  createData(2, 'Pharmaceuticals', 'VKM6KSCTDHEM6KGEAMSYCNEGIPFJMHDSEMIRAQLK76CJDIRMMDHKAIRMFQ ', 'Pfizer Plant, NY, United States')
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Shipments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Item Address</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}