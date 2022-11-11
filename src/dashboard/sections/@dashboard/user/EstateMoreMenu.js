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
import {
  RejectStateUrl,
  DeleteStateUrl,
  UpdateEstateUrl,
} from "../../../constants/urls";
import Swal from "sweetalert2";

// ----------------------------------------------------------------------

export default function EstateMoreMenu({
  item,
  token,
  CategoriesList,
  AreasList,
  EstateTypeList,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [EstateName, setEstateName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [address, setAddress] = useState(item.address);
  const [Category_id, setCategory_id] = useState(item.category_id);
  const [Area_id, setArea_id] = useState(item.area_id);
  const [EstateType_id, setEstateType_id] = useState(item.estate_type_id);
  const [Special, setSpecial] = useState(item.is_special);
  const [Price, setPrice] = useState(item.price);
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

  const handleChangeEsataeName = (e) => {
    setEstateName(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory_id(e.target.value);
  };

  const handleChangeArea = (e) => {
    setArea_id(e.target.value);
  };

  const handleChangeEstateType = (e) => {
    setEstateType_id(e.target.value);
  };

  const handleChangeSpecial = (e) => {
    setSpecial(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmitEditBalance = () => {
    const formData = new FormData();
    formData.append("name", EstateName);
    formData.append("category_id", Category_id);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("category_id", Category_id);
    formData.append("area_id", Area_id);
    formData.append("estate_type_id", EstateType_id);
    formData.append("is_special", Special);
    formData.append("price", Price);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "content-type": "multipart/form-data",
    };
    axios
      .post(`${UpdateEstateUrl}/${item.id}`, formData, {
        headers,
      })
      .then((response) => {
        Swal.fire({ text: "تم تعديل العقار بنجاح", icon: "success" }).then(
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
      .delete(`${DeleteStateUrl}/${item.id}`, {
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

  /* Reject User */
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleChangeRejectReason = (e) => {
    setRejectReason(e.target.value);
  };

  const handleClickOpenRejectDialog = () => {
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
  };

  const handleConfirmReject = () => {
    const data = {
      is_deleted: 1,
      delete_reason: rejectReason,
    };
    axios
      .post(`${RejectStateUrl}/${item.id}`, data, {
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
            primary="تعديل العقار"
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
            primary="حذف العقار"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        {/* Reject Estate */}
        {item.is_deleted === 0 && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenRejectDialog}
          >
            <ListItemIcon>
              <Iconify
                icon="majesticons:analytics-delete-line"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="رفض العقار"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        {/* Edit Dialog */}
        <Dialog
          disableEscapeKeyDown
          open={openEditUser}
          onClose={handleCloseEditUser}
          fullWidth
        >
          <DialogTitle>تعديل العقار </DialogTitle>
          <DialogContent>
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
                  label="اسم العقار"
                  variant="outlined"
                  onChange={handleChangeEsataeName}
                  value={EstateName}
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
                  label="وصف العقار"
                  variant="outlined"
                  onChange={handleChangeDescription}
                  value={description}
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
                  label="العنوان"
                  variant="outlined"
                  onChange={handleChangeAddress}
                  value={address}
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
                <InputLabel id="demo-dialog-select-label">الفئة</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Category_id}
                  onChange={handleChangeCategory}
                  input={<OutlinedInput label="الفئة" />}
                >
                  {CategoriesList.map((category) => (
                    <MenuItem value={category.id} key={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
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
                <InputLabel id="demo-dialog-select-label">المنطقة</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Area_id}
                  onChange={handleChangeArea}
                  input={<OutlinedInput label="المنطقة" />}
                >
                  {AreasList.map((area) => (
                    <MenuItem value={area.id} key={area.id}>
                      {area.name}
                    </MenuItem>
                  ))}
                </Select>
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
                <InputLabel id="demo-dialog-select-label">النوع</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={EstateType_id}
                  onChange={handleChangeEstateType}
                  input={<OutlinedInput label="النوع" />}
                >
                  {EstateTypeList.map((type) => (
                    <MenuItem value={type.id} key={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
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
                <InputLabel id="demo-dialog-select-label">عقار مميز</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Special}
                  onChange={handleChangeSpecial}
                  input={<OutlinedInput label="عقار مميز" />}
                >
                  <MenuItem value={0}>لا</MenuItem>
                  <MenuItem value={1}>نعم</MenuItem>
                </Select>
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
                  type="number"
                  variant="outlined"
                  onChange={handleChangePrice}
                  value={Price}
                />
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
          <DialogTitle id="alert-dialog-title">حذف العقار</DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              هل أنت متأكد من حذف هذا العقار ؟
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

        {/* Reject Dialog */}
        <Dialog
          open={openRejectDialog}
          onClose={handleCloseRejectDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">رفض العقار</DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              يرجى ادخال سبب الرفض
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  label="سبب الرفض"
                  variant="outlined"
                  onChange={handleChangeRejectReason}
                  value={rejectReason}
                />
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRejectDialog}>
              {" "}
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmReject} autoFocus>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
