import { filter } from "lodash";
/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  LinearProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import Label from "../components/Label";

import SearchNotFound from "../components/SearchNotFound";
import {
  MedalsMoreMenu,
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
//
/* import USERLIST from "../_mocks_/user"; */
// get Users Function
/* import { getSpecializations } from "../controller/SpecializationsController";
 */ import {
  AreasListUrl,
  CategoriesListUrl,
  EstateListUrl,
  EstateTypeListUrl,
} from "../constants/urls";

import axios from "axios";
import { useTranslation } from "react-i18next";
import EstateMoreMenu from "../sections/@dashboard/user/EstateMoreMenu";

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

export default function Estate() {
  /* const roles = JSON.parse(localStorage.getItem("roles")); */
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [EstateList, setEstateList] = useState();
  const [CategoriesList, setCategoriesList] = useState();
  const [AreasList, setAreasList] = useState();
  const [EstateTypeList, setEstateTypeList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("Osapi-token");

  async function fecthData() {
    await axios
      .get(EstateListUrl, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setEstateList(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  async function fecthCategories() {
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

  async function fecthAreas() {
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

  async function fecthEstateType() {
    await axios
      .get(EstateTypeListUrl, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setEstateTypeList(response.data.data);
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
      fecthCategories();
      fecthAreas();
      fecthEstateType();
    }
  }, [navigate]);
  if (
    EstateList === undefined ||
    CategoriesList === undefined ||
    AreasList === undefined ||
    EstateTypeList === undefined
  ) {
    return <LinearProgress />;
  }

  const TABLE_HEAD = [
    {
      id: "name",
      label: "اسم العقار",
      alignRight: true,
    },

    {
      id: "area_name",
      label: "المنطقة",
      alignRight: true,
    },
    {
      id: "address",
      label: "العنوان",
      alignRight: true,
    },
    {
      id: "description",
      label: "الوصف",
      alignRight: true,
    },
    {
      id: "category",
      label: "الفئة",
      alignRight: true,
    },
    {
      id: "type",
      label: "النوع",
      alignRight: true,
    },
    {
      id: "status",
      label: "الحالة",
      alignRight: true,
    },
    {
      id: "price",
      label: "السعر",
      alignRight: true,
    },
    {
      id: "user_name",
      label: "اسم المستخدم",
      alignRight: true,
    },
    {
      id: "is_special",
      label: "مميز",
      alignRight: true,
    },
    {
      id: "is_deleted",
      label: "الحالة",
      alignRight: true,
    },
    {
      id: "delete_reason",
      label: "سبب الرفض",
      alignRight: true,
    },

    { id: "" },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EstateList.length) : 0;

  const filteredUsers = applySortFilter(
    EstateList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="العقارات">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            العقارات
          </Typography>
        </Stack>

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
                  rowCount={EstateList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, description } = row;
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
                          <TableCell align="right">{row.address}</TableCell>
                          <TableCell align="right">{description}</TableCell>
                          <TableCell align="right" sx={{ textAlign: "center" }}>
                            {row.category.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.estate_type.name}
                          </TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">{row.user.name}</TableCell>
                          <TableCell align="right">
                            <Label
                              variant="ghost"
                              sx={{
                                color:
                                  row.is_special === 0 ? "orange" : "green",
                              }}
                            >
                              {row.is_special === 1 ? "مميز" : "عادي"}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <Label
                              variant="ghost"
                              sx={{
                                color: row.is_deleted === 0 ? "green" : "red",
                              }}
                            >
                              {row.is_deleted === 1 ? "مرفوض" : "مقبول"}
                            </Label>
                          </TableCell>
                          <TableCell align="right" sx={{ textAlign: "center" }}>
                            {row.delete_reason}
                          </TableCell>
                          {/* {roles.includes(19) && ( */}
                          <TableCell align="left" padding="none">
                            <EstateMoreMenu
                              item={row}
                              token={token}
                              CategoriesList={CategoriesList}
                              AreasList={AreasList}
                              EstateTypeList={EstateTypeList}
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
            count={EstateList.length}
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
