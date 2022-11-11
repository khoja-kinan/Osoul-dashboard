import { filter } from "lodash";
import axios from "axios";
import {
  AreasListUrl,
  AreaSubscriptionListUrl,
  CategoriesListUrl,
  CategorySubscriptionListUrl,
  storageUrl,
  userListUrl,
} from "../constants/urls";

/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Box,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Avatar,
} from "@mui/material";

// components

import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import { LinearProgress } from "@mui/material";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu1,
} from "../sections/@dashboard/user";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";

//
/* import USERLIST from "../_mocks_/user"; */
// get Users Function
/* import GetUsers from "../controller/GetUsers"; */
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function User() {
  const { t, i18n } = useTranslation();
  const roles = JSON.parse(localStorage.getItem("OSroles"));
  console.log(roles);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [fetchApi, setfetchApi] = useState(true);
  const [AddNewUserLoading, setAddNewUserLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [accoutType, setAccoutType] = useState("");
  const [accoutStatus, setAccoutStatus] = useState("");

  const [USERLIST, setUSERLIST] = useState([]);
  const [AreasList, setAreasList] = useState();
  const [Area, setArea] = useState("");
  const [CategoriesList, setCategoriesList] = useState();
  const [Category, setCategory] = useState("");

  let navigate = useNavigate();
  const token = localStorage.getItem("Osapi-token");

  async function fecthAreasData() {
    await axios
      .get(AreasListUrl, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setAreasList(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  async function fecthCategoriesData() {
    await axios
      .get(CategoriesListUrl, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCategoriesList(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(userListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data.data;
              setUSERLIST(data);
              setfetchApi(false);
            }
          })
          .catch((error) => {
            setfetchApi(false);
            Swal.fire({
              icon: "error",
              text: error.response.data.message,
            });
          });
      }
    }
    fecthData();
    fecthAreasData();
    fecthCategoriesData();
  }, [navigate]);

  const TABLE_HEAD = [
    {
      id: "name",
      label: t("description.UsersPageTableHeadUsername"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "phone_number",
      label: t("description.UsersPageTableHeadPhoneNumber"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "roles_name",
      label: t("description.UsersPageTableHeadRole"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "status",
      label: t("description.UsersPageTableHeadStatus"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    { id: "" },
  ];

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const handleClickOpenNewUser = () => {
    setOpenNewUser(true);
  };

  const handleCloseNewUser = () => {
    setOpenNewUser(false);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleChangeAccountType = (event) => {
    setAccoutType(event.target.value);
  };
  const handleChangeAccountStatus = (event) => {
    setAccoutStatus(event.target.value);
  };

  const handleChangeArea = (e) => {
    setArea(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleAddNew = () => {
    setAddNewUserLoading(true);
    const data = {
      name: username,
      phone: number,
      password: password,
      is_active: accoutStatus,
      is_admin: accoutType,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(userListUrl, data, { headers })
      .then((response) => {
        if (Category !== "") {
          const data = {
            user_id: response.data.data.id,
            category_id: Category,
          };
          const headers = {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          };
          axios
            .post(CategorySubscriptionListUrl, data, { headers })
            .then((response) => {})
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }
        if (Area !== "") {
          const data = { user_id: response.data.data.id, area_id: Area };
          const headers = {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          };
          axios
            .post(AreaSubscriptionListUrl, data, { headers })
            .then((response) => {})
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }

        setAddNewUserLoading(false);
        setOpenNewUser(false);
        Swal.fire({ text: "تم إضافة المستخدم بنجاح", icon: "success" }).then(
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
  };
  if (fetchApi || AreasList === undefined || CategoriesList === undefined) {
    return <LinearProgress />;
  }

  return (
    <Page title={t("description.UsersPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("description.UsersPageTitle")}
          </Typography>
          {/*  {roles.includes(2) && ( */}
          <Button variant="contained" onClick={handleClickOpenNewUser}>
            {t("description.UsersPageNewUser")}
          </Button>
          {/*  )} */}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewUser}
          onClose={handleCloseNewUser}
        >
          <DialogTitle>{t("description.NewUserDialogTitle")} </DialogTitle>
          <DialogContent sx={{ width: "22rem" }}>
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
                  label={t("description.NewUserDialogUsername")}
                  variant="outlined"
                  onChange={handleChangeUsername}
                  value={username}
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
                  label={t("description.UsersPageTableHeadPhoneNumber")}
                  variant="outlined"
                  type={"number"}
                  onChange={handleChangeNumber}
                  value={number}
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
                  label={t("description.NewUserDialogPassword")}
                  variant="outlined"
                  onChange={handleChangePassword}
                  value={password}
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
                  {roles.includes(5) && (
                    <MenuItem value={1}>
                      {t("description.NewUserDialogAccountTypeAdmin")}
                    </MenuItem>
                  )}
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
                <InputLabel id="demo-dialog-select-label">
                  {t("description.UsersPageTableHeadStatus")}
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={accoutStatus}
                  onChange={handleChangeAccountStatus}
                  input={
                    <OutlinedInput
                      label={t("description.UsersPageTableHeadStatus")}
                    />
                  }
                >
                  <MenuItem value={0}>{t("description.deactivated")}</MenuItem>
                  <MenuItem value={1}>{t("description.active")}</MenuItem>
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
                <InputLabel id="demo-dialog-select-label">
                  اشتراك الفئة
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Category}
                  onChange={handleChangeCategory}
                  input={<OutlinedInput label="اشتراك الفئة" />}
                >
                  {CategoriesList.map((categry) => (
                    <MenuItem value={categry.id} key={categry.id}>
                      {" "}
                      {categry.name}{" "}
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
                <InputLabel id="demo-dialog-select-label">
                  اشتراك المنطقة
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Area}
                  onChange={handleChangeArea}
                  input={<OutlinedInput label="اشتراك المنطقة" />}
                >
                  {AreasList.map((area) => (
                    <MenuItem value={area.id} key={area.id}>
                      {" "}
                      {area.name}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseNewUser}>
              {t("description.Cancel")}{" "}
            </Button>
            <LoadingButton loading={AddNewUserLoading} onClick={handleAddNew}>
              {t("description.Ok")}{" "}
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <Card>
          <UserListToolbar
            placeHolder={t("description.UsersPageSearchPlaceholder")}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {
                    /* const users = filteredUsers.filter((user) ) */
                    filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          id,
                          name,
                          phone,
                          is_active,
                          is_admin,
                          roles_name,
                          image,
                        } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar
                                  alt={name}
                                  src={`${storageUrl}${image}`}
                                />
                                <Typography
                                  variant="subtitle2"
                                  noWrap
                                  sx={{
                                    margin:
                                      i18n.dir() === "rtl" &&
                                      "0 0.5rem !important",
                                  }}
                                >
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell
                              align={i18n.dir() === "ltr" ? "left" : "right"}
                            >
                              {phone}
                            </TableCell>
                            <TableCell
                              align={i18n.dir() === "ltr" ? "left" : "right"}
                            >
                              <Label
                                variant="ghost"
                                sx={{
                                  color: is_admin === 1 && "green",
                                }}
                              >
                                {is_admin === 0
                                  ? t("description.normalUser")
                                  : is_admin === 1
                                  ? t("description.Admin")
                                  : "مشرف نظام"}
                              </Label>
                            </TableCell>
                            <TableCell
                              align={i18n.dir() === "ltr" ? "left" : "right"}
                            >
                              <Label
                                variant="ghost"
                                sx={{
                                  color: is_active === 0 ? "red" : "green",
                                }}
                              >
                                {is_active === 0
                                  ? t("description.deactivated")
                                  : t("description.active")}
                              </Label>
                            </TableCell>

                            {/* {roles.includes(3) && ( */}
                            <TableCell
                              align={i18n.dir() === "ltr" ? "right" : "left"}
                            >
                              <UserMoreMenu1
                                token={token}
                                item={row}
                                roles={roles}
                              />
                            </TableCell>
                            {/* )} */}
                          </TableRow>
                        );
                      })
                  }
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("description.UsersPageLabelRowsPerPage")}
            sx={{
              direction: "ltr",
              "& .MuiToolbar-root": { alignItems: "center" },
              "& .MuiTablePagination-selectLabel": { marginBottom: "0" },
              "& .MuiTablePagination-displayedRows": { marginBottom: "0" },
            }}
          />
        </Card>
      </Container>
    </Page>
  );
}
