import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { makeStyles, styled } from "@mui/styles";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthContext from "../../context/Auth/AuthContext";
import Logo from "../layout/img/logo.png";
import { useFormik } from "formik";
const useStyles = makeStyles({
  textlogin: {
    fontSize: "15px",
    color: "black",
    fontWeight: "bold",
    fontStyle: "oblique",
    letterSpacing: "1px",
  },
  backgroundLogin: {
    height: "100%",
    minHeight: "100vh",
    boxSizing: "content-box",
    width: "100%",
    //backgroundImage: "url(https://source.unsplash.com/random/2560x1440)",
    background: "rgb(255,255,255)",
    background:
      "linear-gradient(90deg,rgba(28, 39, 125, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(240, 94, 41, 1) 100%);",
    backgroundRepeat: "no-repeat",
    opacity: 1,
    overflowY: "none",
    overflowX: "none",
  },
  caja: {
    background: "rgba(255, 255, 255, 0.46)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
});

const Login = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { iniciarSesion, autenticado } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      iniciarSesion(formData);
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  return (
    <div className={classes.backgroundLogin}>
      <Grid container justifyContent="center">
        <div
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              boxShadow: 3,
              m: 5,
              padding: 4,
              position: "relative",
              marginTop: 5,
            }}
            className={classes.caja}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={Logo}
                alt="logo"
                style={{
                  width: 150,
                  height: "auto",
                }}
              />
            </Box>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Correo Electronico:"
                    name="email"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    error={formik.errors?.email ? true : false}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      htmlFor="password"
                      error={formik.errors?.password ? true : false}
                    >
                      Contraseña:
                    </InputLabel>
                    <OutlinedInput
                      error={formik.errors?.password ? true : false}
                      id="password"
                      name="password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={(event) => {
                        setValues({ ...values, password: event.target.value });
                        formik.handleChange(event);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="password"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#041954",
                  color: "white",
                  fontWeight: "bold",
                  mt: 3,
                  mb: 2,
                  "&:hover": {
                    backgroundColor: "#041954",
                    color: "white",
                  },
                }}
              >
                <Typography
                  fontFamily="monospace"
                  fontWeight="bold"
                  variant="subtitle1"
                >
                  Iniciar Sesion
                </Typography>
              </Button>
              <Link to="/registrarme">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#F05E29",
                    color: "white",
                    fontWeight: "bold",
                    mt: 0,
                    mb: 6,
                    "&:hover": {
                      backgroundColor: "#F05E29",
                      color: "white",
                    },
                  }}
                >
                  <Typography
                    fontFamily="monospace"
                    fontWeight="bold"
                    variant="subtitle1"
                  >
                    Registrarme
                  </Typography>
                </Button>
              </Link>
            </Box>
          </Box>
        </div>
      </Grid>
    </div>
  );
};

export default Login;
function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required("Correo requerido"),
    password: Yup.string().min(8).required("Contraseña requerida"),
  };
}
