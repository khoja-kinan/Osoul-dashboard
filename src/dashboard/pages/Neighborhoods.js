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
  OutlinedInput,
  MenuItem,
  InputLabel,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  NeighborhoodDetails,
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
//

import {
  AreasListUrl,
  CitiesListUrl,
  neighboorhoodListUrl,
} from "../constants/urls";

import axios from "axios";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import NeighborhoodMoreMenu from "../sections/@dashboard/user/NeighborhoodMoreMenu";
import Swal from "sweetalert2";

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

export default function Neighborhoods() {
  /* const roles = JSON.parse(localStorage.getItem("OSroles")); */
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewCity, setOpenNewCity] = useState(false);
  const [Name, setname] = useState("");
  const [Price, setPrice] = useState("");
  const [Area, setArea] = useState("");
  const [state, setState] = useState("");
  const [BtnLoading, setBtnLoading] = useState(false);

  const [neighboorhoodList, setNeighboorhoodList] = useState();
  const [AreasList, setAreasList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("Osapi-token");
  /* All Areas */
  async function fecthAreaData() {
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
  /* all neighboorhood */
  async function fecthneighboorhoodData() {
    await axios
      .get(neighboorhoodListUrl, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setNeighboorhoodList(response.data.data);
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
      fecthAreaData();
      fecthneighboorhoodData();
    }
  }, [navigate]);
  if (neighboorhoodList === undefined || AreasList === undefined) {
    return <LinearProgress />;
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
  const TABLE_HEAD = [
    {
      id: "name",
      label: "اسم الحي",
      alignRight: true,
    },
    {
      id: "area_name",
      label: "اسم المنطقة",
      alignRight: true,
    },
    {
      id: "price",
      label: "السعر",
      alignRight: true,
    },
    {
      id: "details",
      label: "تفاصيل الحي",
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
      const newSelecteds = neighboorhoodList.map((n) => n.name);
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
      ? Math.max(0, (1 + page) * rowsPerPage - neighboorhoodList.length)
      : 0;

  const filteredUsers = applySortFilter(
    neighboorhoodList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  /* 
      New neighboorhood
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

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeArea = (event) => {
    setArea(event.target.value);
  };

  const handleAddNew = () => {
    setBtnLoading(true);
    const data = { name: Name, price: Price, area_id: Area };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(neighboorhoodListUrl, data, { headers })
      .then((response) => {
        setOpenNewCity(false);
        setBtnLoading(false);
        setState({ message: response.data.message });
        Swal.fire({ text: "تم إضافة الحي بنجاح", icon: "success" }).then(
          (result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          }
        );
      })
      .catch((error) => {
        setOpenNewCity(false);
        setBtnLoading(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };
  return (
    <Page title="لوحة التحكم | الأحياء">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            الأحياء
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
          <DialogTitle>إضافة حي جديدة</DialogTitle>
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
                  label="اسم الحي"
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
                  label="السعر"
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
                <InputLabel id="demo-dialog-select-label">المنطقة </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Area}
                  onChange={handleChangeArea}
                  input={<OutlinedInput label="المنطقة" />}
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
            placeHolder="ابحث عن حي..."
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
                  rowCount={neighboorhoodList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, price } = row;
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
                          <TableCell align="right">{row.area.name}</TableCell>
                          <TableCell align="right">{price}</TableCell>
                          <TableCell align="right">
                            <NeighborhoodDetails
                              neighborhood_id={id}
                              token={token}
                            />
                          </TableCell>
                          {/* {roles.includes(15) && ( */}
                          <TableCell align="left">
                            <NeighborhoodMoreMenu
                              item={row}
                              token={token}
                              AreasList={AreasList}
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
            count={neighboorhoodList.length}
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
