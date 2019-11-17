import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  tableBody: {
    "&:nth-child(odd)": {
      backgroundColor: "rgb(255,255,255,0.5)"
    }
  },
  tableItem: {
    fontSize: 17
  },
  result: {
    display: "block",
    width: "100%",
    margin: theme.spacing(2, 0, 0),
    padding: theme.spacing(1, 2),
    borderRadius: 3,
    backgroundColor: "rgb(255,255,255,0.5)",
    color: "darkred",
    fontSize: 16
  },
  message: {
    display: "block",
    width: "100%",
    margin: theme.spacing(2, 0, 0),
    padding: theme.spacing(1, 2),
    borderRadius: 3,
    backgroundColor: "rgb(255,255,255,0.5)",
    color: "darkblue",
    fontSize: 18
  }
});

class RestJsResult extends Component {
  render() {
    const { classes } = this.props;

    const { data } = this.props;
    return Array.isArray(data) ? (
      <Table>
        <TableHead>
          <TableCell>
            <Typography variant="h6">Key</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Value</Typography>
          </TableCell>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {data.map(item => (
            <TableRow key={item.key} className={classes.tableBody}>
              <TableCell component="th" scope="row">
                <Typography className={classes.tableItem}>
                  {item.key}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.tableItem}>
                  {item.value}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : data.message ? (
      <Typography className={classes.message}>{data.message}</Typography>
    ) : data.result ? (
      <Typography variant="overline" className={classes.result}>
        {data.result}
      </Typography>
    ) : (
      <Table>
        <TableHead>
          <TableCell>
            <Typography variant="h6">Key</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Value</Typography>
          </TableCell>
        </TableHead>
        <TableBody className={classes.tableBody}>
          <TableRow className={classes.tableBody}>
            <TableCell component="th" scope="row">
              <Typography className={classes.tableItem}>{data.key}</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.tableItem}>
                {data.value}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

RestJsResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RestJsResult);
