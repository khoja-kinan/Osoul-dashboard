// material
import {
  Box,
  Grid,
  Container,
  Typography,
  LinearProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { statistics } from "../constants/urls";
import axios from "axios";
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const token = localStorage.getItem("Osapi-token");
  const [Statistics, setStatistics] = useState();
  let navigate = useNavigate();

  async function fecthData() {
    await axios
      .get(statistics, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setStatistics(response.data.data);
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
    }
  }, []);
  const { t } = useTranslation();
  return Statistics === undefined ? (
    <LinearProgress />
  ) : (
    <Page title="لوحة التحكم | أصول">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            {t("description.dashboardAppWelcome")}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWeeklySales users_count={Statistics.users_count} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppNewUsers deals={Statistics.deals} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentVisits users={Statistics.users} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates rates={Statistics.estates_by_cities} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
