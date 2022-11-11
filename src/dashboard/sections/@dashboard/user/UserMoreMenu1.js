import { useEffect, useRef, useState } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  storageUrl,
  userListUrl,
  userUpdateUrl,
  userDisableUrl,
  userActivateUrl,
  userUpgradeUrl,
  userDowngradeUrl,
} from "../../../constants/urls";
import Swal from "sweetalert2";
import useStateRef from "react-usestateref";
// ----------------------------------------------------------------------

export default function UserMoreMenu1({ item, token, roles }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUserName] = useState(item.name);
  /* const [number, setNumber] = useState(item.phone); */
  const [accoutType, setAccoutType] = useState(item.is_admin);
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

  const handleEditUsername = (e) => {
    setUserName(e.target.value);
  };
  /* const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  }; */
  const handleChangeAccountType = (event) => {
    setAccoutType(event.target.value);
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
    formData.append("name", username);
    accoutType !== item.is_admin && formData.append("is_admin", accoutType);
    UserImageToUpload !== null
      ? formData.append("image", UserImageToUpload)
      : formData.append("image", previewUserImage);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "content-type": "multipart/form-data",
    };
    axios
      .post(`${userUpdateUrl}${item.id}`, formData, {
        headers,
      })
      .then((response) => {
        Swal.fire({
          text: "تم تحديث معلومات المستخدم بنجاح",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
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
      .delete(`${userListUrl}/${item.id}`, {
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

  /* Disable User */
  const [openDisableDialog, setOpenDisableDialog] = useState(false);

  const handleClickOpenDisableDialog = () => {
    setOpenDisableDialog(true);
  };

  const handleCloseDisableDialog = () => {
    setOpenDisableDialog(false);
  };

  const handleConfirmDisable = () => {
    const data = {};
    axios
      .post(`${userDisableUrl}${item.id}`, data, {
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

  /* Avtivate User */
  const [openActivateDialog, setOpenActivateDialog] = useState(false);

  const handleClickOpenActivateDialog = () => {
    setOpenActivateDialog(true);
  };

  const handleCloseActivateDialog = () => {
    setOpenActivateDialog(false);
  };

  const handleConfirmActivate = () => {
    const data = {};
    axios
      .post(`${userActivateUrl}${item.id}`, data, {
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
    setOpenActivateDialog(false);
  };

  /* Upgrade User */
  const [openUpgradeDialog, setOpenUpgradeDialog] = useState(false);

  const handleClickOpenUpgradeDialog = () => {
    setOpenUpgradeDialog(true);
  };

  const handleCloseUpgradeDialog = () => {
    setOpenUpgradeDialog(false);
  };

  const handleConfirmUpgrade = () => {
    const data = {};
    axios
      .post(`${userUpgradeUrl}${item.id}`, data, {
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
    setOpenUpgradeDialog(false);
  };

  /* Downgrade User */
  const [openDowngradeDialog, setOpenDowngradeDialog] = useState(false);

  const handleClickOpenDowngradeDialog = () => {
    setOpenDowngradeDialog(true);
  };

  const handleCloseDowngradeDialog = () => {
    setOpenDowngradeDialog(false);
  };

  const handleConfirmDowngrade = () => {
    const data = {};
    axios
      .post(`${userDowngradeUrl}${item.id}`, data, {
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
    setOpenDowngradeDialog(false);
  };

  /* Change Password */
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [password, setPassword, passwordRef] = useStateRef("");
  const [
    passwordConfirmation,
    setPasswordConfirmation,
    passwordConfirmationRef,
  ] = useStateRef("");
  const [PassError, setPassError] = useState(false);

  const handleClickOpenEditPassword = () => {
    setOpenEditPassword(true);
  };

  const handleCloseEditPassword = () => {
    setOpenEditPassword(false);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };
  useEffect(() => {
    passwordRef.current !== passwordConfirmationRef.current
      ? setPassError(true)
      : setPassError(false);
  }, [passwordRef.current, passwordConfirmationRef.current]);

  const handleConfirmEditPassword = () => {
    const data = {
      password: password,
    };
    axios
      .post(`${userUpdateUrl}${item.id}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setOpenEditPassword(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
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
            primary={t("description.UsersPageEditUser")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        {/* Delete Button */}
        {roles.includes(4) && (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenDeleteDialog}
          >
            <ListItemIcon>
              <Iconify icon="fluent:delete-32-filled" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={t("description.UsersPageDeleteUser")}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
        {/* Disable Button  & Activate User*/}
        {item.is_active === 1 ? (
          item.is_admin !== 1 && (
            <MenuItem
              sx={{ color: "text.secondary" }}
              onClick={handleClickOpenDisableDialog}
            >
              <ListItemIcon>
                <Iconify
                  icon="fa-solid:user-alt-slash"
                  width={24}
                  height={24}
                />
              </ListItemIcon>
              <ListItemText
                primary="تعطيل الحساب"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          )
        ) : (
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={handleClickOpenActivateDialog}
          >
            <ListItemIcon>
              <Iconify
                icon="clarity:assign-user-solid"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText
              primary="تفعيل الحساب"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
        {item.is_admin === 0
          ? roles.includes(5) && (
              <MenuItem
                sx={{ color: "text.secondary" }}
                onClick={handleClickOpenUpgradeDialog}
              >
                <ListItemIcon>
                  <Iconify
                    icon="bi:arrow-up-square-fill"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="ترقية إلى مشرف"
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </MenuItem>
            )
          : item.is_admin === 2
          ? roles.includes(6) && (
              <MenuItem
                sx={{ color: "text.secondary" }}
                onClick={handleClickOpenDowngradeDialog}
              >
                <ListItemIcon>
                  <Iconify
                    icon="bi:arrow-down-square-fill"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="تخفيض إلى مستخدم"
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </MenuItem>
            )
          : ""}

        {/* Edit Dialog */}
        <Dialog
          disableEscapeKeyDown
          open={openEditUser}
          onClose={handleCloseEditUser}
        >
          <DialogTitle>{t("description.UsersPageEditUser")}</DialogTitle>
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
                  label={t("description.UsersPageTableHeadUsername")}
                  variant="outlined"
                  onChange={handleEditUsername}
                  value={username}
                />
              </FormControl>
            </Box>
            {roles.includes(5) && (
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <FormControl sx={{ m: 1, minWidth: "100%" }}>
                  <InputLabel id="demo-dialog-select-label">
                    {t("description.NewUserDialogAccountType")}
                  </InputLabel>
                  <Select
                    labelId="demo-dialog-select-label"
                    id="demo-dialog-select"
                    value={accoutType}
                    onChange={handleChangeAccountType}
                    input={
                      <OutlinedInput
                        label={t("description.NewUserDialogAccountType")}
                      />
                    }
                  >
                    <MenuItem value={0}>{t("description.normalUser")}</MenuItem>
                    <MenuItem value={1}>
                      {t("description.NewUserDialogAccountTypeAdmin")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                width: "90%",
              }}
            >
              <Typography>{t("description.UserImage")}</Typography>
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
                      {t("description.uploadUserImage")}
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
          <DialogTitle id="alert-dialog-title">
            {t("description.DeleteUserDialogTitle")}
          </DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              {t("description.DeleteUserDialogMessage")}
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
        {/* Disable Dialog */}
        <Dialog
          open={openDisableDialog}
          onClose={handleCloseDisableDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("description.UsersPageDisableUser")}
          </DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              {t("description.DisableUserDialogMessage")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDisableDialog}>
              {" "}
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmDisable} autoFocus>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Activate Dialog */}
        <Dialog
          open={openActivateDialog}
          onClose={handleCloseActivateDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">تفعيل حساب المستخدم</DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              هل انت متأكد من تفعيل حساب هذا المستخدم ؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseActivateDialog}>
              {" "}
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmActivate} autoFocus>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Upgrade Dialog */}
        <Dialog
          open={openUpgradeDialog}
          onClose={handleCloseUpgradeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">ترقية حساب المستخدم</DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              هل انت متأكد من ترقية حساب هذا المستخدم إلى مشرف؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpgradeDialog}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmUpgrade} autoFocus>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>

        {/* downGrade Dialog */}
        <Dialog
          open={openDowngradeDialog}
          onClose={handleCloseDowngradeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            تخفيض صلاحية حساب المستخدم
          </DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              هل انت متأكد من تخفيض صلاحية حساب هذا المستخدم إلى مستخدم عادي؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDowngradeDialog}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmDowngrade} autoFocus>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
        {/* change password */}
        {item.is_admin === 1
          ? roles.includes(1) && (
              <MenuItem
                sx={{ color: "text.secondary" }}
                onClick={handleClickOpenEditPassword}
              >
                <ListItemIcon>
                  <Iconify
                    icon="ri:lock-password-fill"
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="تعديل كلمة المرور"
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </MenuItem>
            )
          : ""}

        <Dialog
          disableEscapeKeyDown
          open={openEditPassword}
          onClose={handleCloseEditPassword}
        >
          <DialogTitle>تعديل كلمة المرور</DialogTitle>
          <DialogContent sx={{ width: "20rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <TextField
                sx={{ margin: "1rem 0", width: "100%" }}
                id="outlined-basic"
                label="كلمة المرور"
                variant="outlined"
                onChange={handleChangePassword}
                value={password}
                error={PassError}
                helperText={
                  PassError && " كلمة المرور غير متطابقة مع تأكيد كلمة المرور"
                }
              />

              <TextField
                sx={{ margin: "1rem 0", width: "100%" }}
                id="outlined-basic"
                label="تأكيد كلمة المرور"
                variant="outlined"
                onChange={handleChangePasswordConfirmation}
                value={passwordConfirmation}
                error={PassError}
                helperText={
                  PassError && " كلمة المرور غير متطابقة مع تأكيد كلمة المرور"
                }
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditPassword}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmEditPassword}>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
