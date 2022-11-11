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
  Typography,
  Avatar,
  DialogContentText,
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
import { storageUrl, CategoriesListUrl } from "../../../constants/urls";
import Swal from "sweetalert2";

// ----------------------------------------------------------------------

export default function CatrgoryMoreMenu({ item, token }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [AreaName, setAreaName] = useState(item.name);
  const [Price, setPrice] = useState(item.price);

  const [UserImageToShow, setUserImageToShow] = useState(item.image);
  const [previewUserImage, setPreviewUserImage] = useState("");
  const [UserImageToUpload, setUserImageToUpload] = useState(null);
  /* 
      User Edit
  */

  const [openEditUser, setOpenEditUser] = useState(false);

  const handleClickOpenEditUser = () => {
    setOpenEditUser(true);
  };

  const handleCloseEditUser = () => {
    setOpenEditUser(false);
    setIsOpen(false);
  };

  const handleEditAreaName = (e) => {
    setAreaName(e.target.value);
  };

  const handleEditPrice = (event) => {
    setPrice(event.target.value);
  };

  const handleCaptureUserImage = (e) => {
    setUserImageToShow(null);
    setUserImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewUserImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmitEditBalance = () => {
    const formData = new FormData();
    formData.append("name", AreaName);
    formData.append("price", Price);
    UserImageToUpload !== null
      ? formData.append("image", UserImageToUpload)
      : formData.append("image", previewUserImage);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "content-type": "multipart/form-data",
    };
    axios
      .post(`${CategoriesListUrl}/${item.id}`, formData, {
        headers,
      })
      .then((response) => {
        Swal.fire({ text: "تم تعديل الفئة بنجاح", icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          }
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
    setOpenEditUser(false);
    setIsOpen(false);
  };

  /* DElete User */
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${CategoriesListUrl}/${item.id}`, {
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
          onClick={handleClickOpenEditUser}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="تعديل الفئة"
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
            primary="حذف الفئة"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        {/* Edit Dialog */}
        <Dialog
          disableEscapeKeyDown
          open={openEditUser}
          onClose={handleCloseEditUser}
        >
          <DialogTitle>تعديل الفئة </DialogTitle>
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
                  label="اسم الفئة"
                  variant="outlined"
                  onChange={handleEditAreaName}
                  value={AreaName}
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
                  label="السعر"
                  variant="outlined"
                  onChange={handleEditPrice}
                  value={Price}
                />
              </FormControl>
            </Box>

            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                width: "90%",
              }}
            >
              <Typography>صورة الفئة</Typography>
              <FormControl sx={{ m: 1, maxWidth: "100%" }}>
                <Box className="upload__image-wrapper">
                  {previewUserImage ? (
                    <Box className="image-item">
                      <Avatar
                        src={`${previewUserImage}`}
                        alt=""
                        sx={{ width: 100, height: 100, margin: "0 auto" }}
                      />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setPreviewUserImage(null)}
                        >
                          {t("description.remove")}
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      sx={{ margin: "1rem 0" }}
                      variant="outlined"
                      component="label"
                    >
                      ارفع صورة الفئة
                      <input
                        type="file"
                        accept="image/png"
                        hidden
                        onChange={handleCaptureUserImage}
                      />
                    </Button>
                  )}
                  {UserImageToShow && (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <Avatar
                        src={`${storageUrl}${UserImageToShow}`}
                        alt=""
                        sx={{ width: 100, height: 100, margin: "0 auto" }}
                      />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setUserImageToShow(null)}
                        >
                          {t("description.remove")}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditUser}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleSubmitEditBalance}>
              {t("description.Ok")}
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
          <DialogTitle id="alert-dialog-title">حذف الفئة</DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              هل أنت متأكد من حذف هذه الفئة ؟
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
