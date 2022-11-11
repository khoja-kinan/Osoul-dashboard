import { useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  IconButton,
  DialogContentText,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Table } from "react-bootstrap";

// ----------------------------------------------------------------------

export default function ProperiesDetails({ item }) {
  /* 
      City 
  */

  /* DElete city */
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpenDeleteDialog}>
        <Iconify icon="clarity:details-solid" width={20} height={20} />
      </IconButton>

      {/* Delete Dialog */}
      <Dialog
        fullWidth
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تفاصيل الخاصية</DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          sx={{ padding: "2rem", marginTop: "2rem" }}
        >
          <DialogContentText>
            <DialogTitle id="alert-dialog-title">
              اسم الخاصية : {item.name}
            </DialogTitle>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">الخيارات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.options &&
                    item.options.map((option) => (
                      <TableRow>
                        <TableCell component="th" scope="row" align="right">
                          {option.name}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>إغلاق</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
