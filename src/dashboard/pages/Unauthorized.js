import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
// components
import { MotionContainer, varBounceIn } from "../components/animate";
import Page from "../components/Page";
import { HelmetProvider } from "react-helmet-async";
import ThemeConfig from "../theme";
import ScrollToTop from "../components/ScrollToTop";
import GlobalStyles from "../theme/globalStyles";
import { BaseOptionChartStyle } from "../components/charts/BaseOptionChart";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <HelmetProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <RootStyle title="Unauthorized | Social Media Famous">
          <Container>
            <MotionContainer initial="initial" open>
              <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
                <motion.div variants={varBounceIn}>
                  <Typography variant="h3" paragraph>
                    Sorry, you are Unauthorized to access this page !
                  </Typography>
                </motion.div>

                <motion.div variants={varBounceIn}>
                  <Box
                    component="img"
                    src="/static/illustrations/401.jpg"
                    sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                  />
                </motion.div>

                <Button
                  to="/dashboard/app"
                  size="large"
                  variant="contained"
                  component={RouterLink}
                >
                  Go Back
                </Button>
              </Box>
            </MotionContainer>
          </Container>
        </RootStyle>
      </ThemeConfig>
    </HelmetProvider>
  );
}
