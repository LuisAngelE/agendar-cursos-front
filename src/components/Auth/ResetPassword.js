import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";
import Logo from "../layout/img/logoNegro.png";
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
    background: "#E8F5E9",
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

              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  mb: 3,
                  maxWidth: 400,
                  mx: "auto",
                }}
              >
                Ingresa tu correo electrónico para enviarte un código de
                verificación y restaurar tu cuenta.
              </Typography>

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
                  backgroundColor: "#F05E29",
                  color: "white",
                  fontWeight: "bold",
                  mt: 3,
                  mb: 2,
                  "&:hover": {
                    backgroundColor: "#F05E29 ",
                    color: "white",
                  },
                }}
              >
                Enviar
              </Button>
              <Box sx={{ textAlign: "center", width: "100%", mt: 2, mb: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    to="/"
                    style={{
                      color: "#F05E29",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#c24c1f")}
                    onMouseLeave={(e) => (e.target.style.color = "#F05E29")}
                  >
                    Inicia sesión aquí
                  </Link>
                </Typography>
              </Box>
            </Box>
          </div>
        </Grid>
      </div>
    </form>
  );
};

export default ResetPassword;
