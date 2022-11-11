import { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { AreasListUrl, neighboorhoodListUrl } from "../../../constants/urls";
import { Table } from "react-bootstrap";

// ----------------------------------------------------------------------

export default function NeighborhoodDetails({ neighborhood_id, token }) {
  /* 
      City 
  */

  const [NeighborhoodDetails, setNeighborhoodDetails] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .get(`${neighboorhoodListUrl}/${neighborhood_id}`, { headers })
      .then((response) => {
        setNeighborhoodDetails(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
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
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تفاصيل المنطقة</DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          sx={{ padding: "2rem", marginTop: "2rem" }}
        >
          <DialogContentText>
            <DialogTitle id="alert-dialog-title">
              اسم المنطقة : {NeighborhoodDetails.name}
            </DialogTitle>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">
                      اسماء المستخدمين المشتركين في المنطقة{" "}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {NeighborhoodDetails.User_Subscriptions &&
                    NeighborhoodDetails.User_Subscriptions.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell component="th" scope="row" align="right">
                          {user.user.name}
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
