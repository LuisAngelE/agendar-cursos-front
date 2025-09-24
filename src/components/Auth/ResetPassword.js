import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";
import Logo from "../layout/img/logo.png";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/Auth/AuthContext";
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

const ResetPassword = () => {
  const classes = useStyles();
  const { ResetPassword } = React.useContext(AuthContext);

  const reset = () => {
    setValue("email", "", { shouldDirty: true });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const onSubmit = (data, e) => {
    ResetPassword(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      onKeyDown={(e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") e.preventDefault();
      }}
    >
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
              <br />
              <div
                style={{
                  textAlign: "center",
                  color: "black",
                  marginBottom: "25px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                Recupera tu cuenta
              </div>
              <div
                style={{
                  textAlign: "center",
                  color: "black",
                  marginBottom: "25px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                Ingrese su correo electrónico para enviar un código de
                verificación y restaurar su cuenta.
              </div>

              <Grid item xs={12} md={12} lg={12} xl={12}>
                <TextField
                  type="email"
                  fullWidth
                  label="Correo electrónico"
                  {...register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Correo inválido",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
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
                    backgroundColor: "#041954 ",
                    color: "white",
                  },
                }}
              >
                Enviar
              </Button>
              <Link to="/" style={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#F05E29",
                    color: "white",
                    fontWeight: "bold",
                    mb: 2,
                    "&:hover": {
                      backgroundColor: "#F05E29",
                      color: "white",
                    },
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Link>
            </Box>
          </div>
        </Grid>
      </div>
    </form>
  );
};

export default ResetPassword;
