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
  Avatar,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  CatrgoryMoreMenu,
  CityDetails,
  CityMoreMenu,
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
//

import {
  CategoriesListUrl,
  CitiesListUrl,
  storageUrl,
} from "../constants/urls";

import axios from "axios";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
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

export default function Categories() {
  const roles = JSON.parse(localStorage.getItem("OSroles"));
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewCity, setOpenNewCity] = useState(false);
  const [AreaName, setAreaName] = useState();
  const [Price, setPrice] = useState();

  const [UserImageToShow, setUserImageToShow] = useState();
  const [previewUserImage, setPreviewUserImage] = useState("");
  const [UserImageToUpload, setUserImageToUpload] = useState(null);

  const [state, setState] = useState("");
  const [BtnLoading, setBtnLoading] = useState(false);

  const [CategoriesList, setCategoriesList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("Osapi-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
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
    }
    fecthData();
  }, [navigate]);
  if (CategoriesList === undefined) {
    return <LinearProgress />;
  }
  const TABLE_HEAD = [
    {
      id: "name",
      label: "اسم الفئة",
      alignRight: true,
    },
    {
      id: "price",
      label: "السعر",
      alignRight: true,
    },
    {
      id: "image",
      label: "الصورة",
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
      const newSelecteds = CategoriesList.map((n) => n.name);
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
      ? Math.max(0, (1 + page) * rowsPerPage - CategoriesList.length)
      : 0;

  const filteredUsers = applySortFilter(
    CategoriesList,
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

  const handleAddNew = () => {
    setBtnLoading(true);
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
      .post(CategoriesListUrl, formData, { headers })
      .then((response) => {
        setOpenNewCity(false);
        setBtnLoading(false);
        setState({ message: response.data.message });
        Swal.fire({ text: "تم إضافة الفئة بنجاح", icon: "success" }).then(
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
    <Page title="لوحة التحكم | الفئات">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            الفئات
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
          <DialogTitle>إضافة فئة جديدة</DialogTitle>
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
            placeHolder="ابحث عن فئة..."
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
                  rowCount={CategoriesList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, price, image } = row;
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
                          <TableCell align="right">{price}</TableCell>
                          <TableCell align="right">
                            {" "}
                            <Avatar alt={name} src={`${storageUrl}${image}`} />
                          </TableCell>

                          {/* {roles.includes(15) && ( */}
                          <TableCell align="left">
                            <CatrgoryMoreMenu item={row} token={token} />
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
            count={CategoriesList.length}
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
