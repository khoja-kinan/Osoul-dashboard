import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// component
import Iconify from "../../../components/Iconify";
// login function
import { login } from "../../../controller/AuthController";
//
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [LoadingBtn, setLoadingBtn] = useState(false);
  const loginUser = async () => {
    setLoadingBtn(true);
    const result = await login(
      formik.values.number,
      formik.values.password,
      formik.values.remember === true ? 1 : 0
    );
    if (result.status === 200) {
      const username = result.data.data.user.name;
      const roles = result.data.data.permissions;
      setAuth({ username, roles });
      localStorage.setItem("OSusername", username);
      localStorage.setItem("OSroleName", result.data.data.user.role.name);
      localStorage.setItem("OSroles", JSON.stringify(roles));
      localStorage.setItem("OSremember_token", result.data.data.remember_token);
      localStorage.setItem("Osapi-token", result.data.data.token);
      setLoadingBtn(false);

      navigate("/dashboard/app", { replace: true });
    } else {
      setLoadingBtn(false);
      setError(result.data.message);
      setShowError(true);
    }
  };
  const LoginSchema = Yup.object().shape({
    number: Yup.number().required(t("description.loginFormRequirednumber")),
    password: Yup.string().required(t("description.loginFormRequiredPass")),
  });

  const formik = useFormik({
    initialValues: {
      number: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      loginUser();
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ outlineColor: "#495676" }}>
          {showError ? (
            <div
              style={{
                color: "red",
                border: "1px solid red",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          ) : (
            ""
          )}
          <TextField
            fullWidth
            autoComplete="number"
            type="number"
            label={t("description.loginFormNumber")}
            {...getFieldProps("number")}
            error={Boolean(touched.number && errors.number)}
            helperText={touched.number && errors.number}
            sx={{
              "& .MuiFormHelperText-root": {
                textAlign: i18n.dir() === "ltr" ? "left" : "right",
              },
            }}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label={t("description.loginFormPass")}
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            sx={{
              "& .MuiFormHelperText-root": {
                textAlign: i18n.dir() === "ltr" ? "left" : "right",
              },
              "& .MuiOutlinedInput-root": {
                flexDirection: i18n.dir() === "ltr" ? "row" : "row-reverse",
              },
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
                style={{
                  color: "#495676",
                }}
              />
            }
            label="تذكرني"
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={LoadingBtn}
          style={{
            backgroundColor: "#374ea1",
          }}
        >
          {t("description.loginFormLoginButton")}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
