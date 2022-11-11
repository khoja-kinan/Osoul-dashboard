// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthProvider";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Login from "./pages/Login";

// ----------------------------------------------------------------------

export default function AppLogin() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <HelmetProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <LogoOnlyLayout>
          <Login />
        </LogoOnlyLayout>
      </ThemeConfig>
    </HelmetProvider>
  );
}
