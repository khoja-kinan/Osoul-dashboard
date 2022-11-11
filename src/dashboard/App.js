// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import { useTranslation } from "react-i18next";
import Login from "./pages/Login";

// ----------------------------------------------------------------------

export default function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Login />
      {/* <Router /> */}
    </ThemeConfig>
  );
}
