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
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  CityDetails,
  CityMoreMenu,
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
//

import { PropertiesListUrl } from "../constants/urls";

import axios from "axios";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import ProperiesMoreMenu from "../sections/@dashboard/user/ProperiesMoreMenu";
import ProperiesDetails from "../sections/@dashboard/user/ProperiesDetails";

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

export default function Properies() {
  const roles = JSON.parse(localStorage.getItem("OSroles"));
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewCity, setOpenNewCity] = useState(false);
  const [Name, setname] = useState("");
  const [Type, setType] = useState("0");
  const [state, setState] = useState("");
  const [BtnLoading, setBtnLoading] = useState(false);

  const [PropertiesList, setPropertiesList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("Osapi-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(PropertiesListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setPropertiesList(response.data.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, [navigate]);
  if (PropertiesList === undefined) {
    return <LinearProgress />;
  }
  const TABLE_HEAD = [
    {
      id: "name",
      label: "اسم الخاصية",
      alignRight: true,
    },
    {
      id: "type",
      label: "نوع الخاصية",
      alignRight: true,
    },
    {
      id: "options",
      label: "خيارات الخاصية",
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
      const newSelecteds = PropertiesList.map((n) => n.name);
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
      ? Math.max(0, (1 + page) * rowsPerPage - PropertiesList.length)
      : 0;

  const filteredUsers = applySortFilter(
    PropertiesList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  /* 
      New City
  */
  const handleClickOpenNewCity = () => {
    setOpenNewCity(true);
  };

  const handleCloseNewCity = () => {
    setOpenNewCity(false);
  };

  const handleChangeName = (event) => {
    setname(event.target.value);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleAddNew = () => {
    setBtnLoading(true);
    const data = { name: Name };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(PropertiesListUrl, data, { headers })
      .then((response) => {
        setOpenNewCity(false);
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
    <Page title="لوحة التحكم | الخصائص">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            الخصائص
          </Typography>
          {/* {roles.includes(14) && ( */}
          <Button variant="contained" onClick={handleClickOpenNewCity}>
            إضافة جديد
          </Button>
          {/* )} */}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewCity}
          onClose={handleCloseNewCity}
        >
          <DialogTitle>إضافة خاصية جديدة</DialogTitle>
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
                  label="اسم الخاصية"
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
                <InputLabel id="demo-dialog-select-label">
                  نوع الخاصية
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Type}
                  onChange={handleChangeType}
                  input={<OutlinedInput label="نوع الخاصية" />}
                >
                  <MenuItem value={"0"} disabled>
                    اختر من القائمة
                  </MenuItem>
                  <MenuItem value={"Checkbox"}>مربع اختيار</MenuItem>
                  <MenuItem value={"Dropdown"}>قائمة منسدلة</MenuItem>
                  <MenuItem value={"Textfield"}>مربع نص</MenuItem>
                  <MenuItem value={"Range"}>مجال قيم</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseNewCity}>
              {t("description.Cancel")}{" "}
            </Button>
            <LoadingButton onClick={handleAddNew} loading={BtnLoading}>
              {t("description.Ok")}{" "}
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <Card>
          <UserListToolbar
            placeHolder="ابحث هنا..."
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
                  rowCount={PropertiesList.length}
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
                          <TableCell align="right">{name}</TableCell>
                          <TableCell align="right">{row.type}</TableCell>
                          <TableCell align="right">
                            <ProperiesDetails item={row} token={token} />
                          </TableCell>
                          {/* {roles.includes(15) && ( */}
                          <TableCell align="left">
                            <ProperiesMoreMenu item={row} token={token} />
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
            count={PropertiesList.length}
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
