import { filter } from "lodash";
/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  LinearProgress,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
//

import {
  CategoriesListUrl,
  CategorySubscriptionListUrl,
  userListUrl,
} from "../constants/urls";

import axios from "axios";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import CategorySubscriptionMoreMenu from "../sections/@dashboard/user/CategorySubscriptionMoreMenu";

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

export default function CategorySupscription() {
  const roles = JSON.parse(localStorage.getItem("OSroles"));
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [state, setState] = useState("");
  const [BtnLoading, setBtnLoading] = useState(false);

  const [User, setUser] = useState("");
  const [Area, setArea] = useState("");

  const [CategoriesSubscriptions, setCategoriesSubscriptions] = useState();
  const [UsersList, setUsersList] = useState();
  const [CategoriesList, setCategoriesList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("Osapi-token");

  async function fecthData() {
    await axios
      .get(CategorySubscriptionListUrl, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCategoriesSubscriptions(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  async function fecthUsersData() {
    await axios
      .get(userListUrl, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUsersList(response.data.data);
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
    if (token === null) {
      navigate("/");
    } else {
      fecthData();
      fecthUsersData();
      fecthCategoriesData();
    }
  }, []);
  if (
    CategoriesSubscriptions === undefined ||
    UsersList === undefined ||
    CategoriesList === undefined
  ) {
    return <LinearProgress />;
  }
  const TABLE_HEAD = [
    {
      id: "name",
      label: "اسم المستخدم",
      alignRight: true,
    },
    {
      id: "category_name",
      label: "اسم الفئة",
      alignRight: true,
    },
    { id: "" },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = CategoriesSubscriptions.map((n) => n.name);
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - CategoriesSubscriptions.length)
      : 0;

  const filteredUsers = applySortFilter(
    CategoriesSubscriptions,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  /* New Subscription */
  const handleClickOpenNewDialog = () => {
    setOpenNewDialog(true);
  };

  const handleCloseNewDialog = () => {
    setOpenNewDialog(false);
  };

  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };

  const handleChangeArea = (e) => {
    setArea(e.target.value);
  };

  const handleAddNew = () => {
    setBtnLoading(true);
    const data = { user_id: User, category_id: Area };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(CategorySubscriptionListUrl, data, { headers })
      .then((response) => {
        setOpenNewDialog(false);
        setBtnLoading(false);
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  };

  return (
    <Page title="لوحة التحكم | اشتراكات الفئات">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            اشتراكات الفئات
          </Typography>
          {/* {roles.includes(14) && ( */}
          <Button variant="contained" onClick={handleClickOpenNewDialog}>
            إضافة جديد
          </Button>
          {/* )} */}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewDialog}
          onClose={handleCloseNewDialog}
        >
          <DialogTitle>إضافة اشتراك جديد</DialogTitle>
          <DialogContent sx={{ width: "20rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel id="demo-dialog-select-label">
                  اسم المستخدم{" "}
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={User}
                  onChange={handleChangeUser}
                  input={<OutlinedInput label="اسم المستخدم" />}
                >
                  {UsersList.map((user) => (
                    <MenuItem value={user.id} key={user.id}>
                      {" "}
                      {user.name}{" "}
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
                <InputLabel id="demo-dialog-select-label">الفئة</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Area}
                  onChange={handleChangeArea}
                  input={<OutlinedInput label="الفئة" />}
                >
                  {CategoriesList.map((area) => (
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
            <Button onClick={handleCloseNewDialog}>
              {t("description.Cancel")}{" "}
            </Button>
            <LoadingButton onClick={handleAddNew} loading={BtnLoading}>
              {t("description.Ok")}{" "}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <Card>
          <UserListToolbar
            placeHolder="ابحث عن اشتراك..."
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
                  rowCount={CategoriesSubscriptions.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name } = row;
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
                          <TableCell align="right">{row.user.name}</TableCell>
                          <TableCell align="right">
                            {row.category.name}
                          </TableCell>
                          {/* {roles.includes(15) && ( */}
                          <TableCell align="left">
                            <CategorySubscriptionMoreMenu
                              item={row}
                              token={token}
                              UsersList={UsersList}
                              CategoriesList={CategoriesList}
                            />
                          </TableCell>
                          {/* )} */}
                        </TableRow>
                      );
                    })}
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={CategoriesSubscriptions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="عدد الأسطر في الصفحة"
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
