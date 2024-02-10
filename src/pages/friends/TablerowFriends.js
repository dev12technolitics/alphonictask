import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";

TablerowFriends.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function TablerowFriends({ row, index }) {
  const { name, email_id, contact_no } = row;

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell component="th" scope="row">
          {contact_no}
        </TableCell>
        <TableCell component="th" scope="row">
          {email_id}
        </TableCell>

        <TableCell align="left">
          <Button variant="contained">Sends Requests</Button>
        </TableCell>
      </TableRow>
    </>
  );
}
