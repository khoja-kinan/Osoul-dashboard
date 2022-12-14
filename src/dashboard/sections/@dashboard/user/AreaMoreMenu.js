import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
  DialogContentText,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { AreasListUrl, CitiesListUrl } from "../../../constants/urls";

// ----------------------------------------------------------------------

export default function AreaMoreMenu({ item, token, CitiesList }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  /* 
      City 
  */

  const [openCity, setOpenCity] = useState(false);
  const [Name, setname] = useState(item.name);
  const [Price, setPrice] = useState(item.price);
  const [City, setCity] = useState(item.city_id);
  const [state, setState] = useState("");

  const handleChangeName = (event) => {
    setname(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleClickOpenCity = () => {
    setOpenCity(true);
  };

  const handleCloseEditCity = () => {
    setOpenCity(false);
  };

  const handleConfirmEditCity = () => {
    const data = { name: Name, price: Price, city_id: City };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .put(`${AreasListUrl}/${item.id}`, data, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenCity(false);
  };
  /* DElete city */
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${AreasListUrl}/${item.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setOpenDeleteDialog(false);
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* Edit Button */}
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenCity}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="?????????? ??????????????"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        {/* Delete Button */}
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenDeleteDialog}
        >
          <ListItemIcon>
            <Iconify icon="fluent:delete-32-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="?????? ??????????????"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        {/* Edit Dialog */}
        <Dialog
          disableEscapeKeyDown
          open={openCity}
          onClose={handleCloseEditCity}
        >
          <DialogTitle>?????????? ??????????????</DialogTitle>
          <DialogContent sx={{ width: "20rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  label="?????? ??????????????"
                  variant="outlined"
                  onChange={handleChangeName}
                  value={Name}
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  type={"number"}
                  label="??????????"
                  variant="outlined"
                  onChange={handleChangePrice}
                  value={Price}
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel id="demo-dialog-select-label">?????????????? </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={City}
                  onChange={handleChangeCity}
                  input={<OutlinedInput label="??????????????" />}
                >
                  {CitiesList.map((city) => (
                    <MenuItem value={city.id} key={city.id}>
                      {" "}
                      {city.name}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditCity}>
              {t("description.Cancel")}{" "}
            </Button>
            <Button onClick={handleConfirmEditCity}>
              {t("description.Ok")}{" "}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">?????? ??????????????</DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              ???? ?????? ?????????? ???? ?????? ?????? ?????????????? ??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>
              {" "}
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmDelete} autoFocus>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
