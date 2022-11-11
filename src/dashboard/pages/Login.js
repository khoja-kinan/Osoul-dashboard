/* import { Link as RouterLink } from 'react-router-dom'; */
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Container, Typography } from "@mui/material";
// layouts
/* import AuthLayout from '../layouts/AuthLayout'; */
// components
import Page from "../components/Page";
import { LoginForm } from "../sections/authentication/login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RememberToketlogin } from "../controller/RememberToketlogin";
import useAuth from "../hooks/useAuth";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));
// ----------------------------------------------------------------------

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const remember_Token = localStorage.getItem("OSremember_token");

  useEffect(() => {
    async function checkUser() {
      const result = await RememberToketlogin(remember_Token);
      if (result != null && result.status === 1) {
        const username = result.data.user.name;
        const roles = result.data.permissions;
        setAuth({ username, roles });
        localStorage.setItem("OSusername", username);
        localStorage.setItem("OSroleName", result.data.user.name);
        localStorage.setItem("OSroles", JSON.stringify(roles));
        localStorage.setItem("OSremember_token", result.data.remember_token);
        localStorage.setItem("Osapi-token", result.data.token);

        navigate("/dashboard/app", { replace: true });
      }
    }
    if (remember_Token !== "undefined" && remember_Token !== null) {
      checkUser();
    }
  }, [navigate]);
  return (
    <RootStyle title="Login | Osoul">
      <SectionStyle
        sx={{ display: { xs: "none", md: "flex", padding: "1rem" } }}
      >
        <img src="/static/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              تسجيل الدخول إلى أصول{" "}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              يرجى إدخال بيانات اعتمادك{" "}
            </Typography>
          </Stack>

          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
