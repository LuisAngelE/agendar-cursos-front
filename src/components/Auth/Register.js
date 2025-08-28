import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
    // backgroundImage: "url(https://source.unsplash.com/random/2560x1440)",
    background: "rgb(255,255,255)",
    background:
      "radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(4, 25, 84, 1) 0%)",
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
    margin: "auto",
  },
});

const Register = () => {
  const classes = useStyles();
  const { Register } = React.useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const reset = () => {
    setValue("name", "", { shouldDirty: true });
    setValue("last_name", "", { shouldDirty: true });
    setValue("phone", "", { shouldDirty: true });
    setValue("email", "", { shouldDirty: true });
    setValue("password", "", { shouldDirty: true });
    setValue("password_confirmation", "", { shouldDirty: true });
  };

  const [passwordValues, setPasswordValues] = useState({
    password: "",
    showPassword: false,
  });

  const [confirmPasswordValues, setConfirmPasswordValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = (field) => {
    if (field === "password") {
      setPasswordValues({
        ...passwordValues,
        showPassword: !passwordValues.showPassword,
      });
    } else if (field === "password_confirmation") {
      setConfirmPasswordValues({
        ...confirmPasswordValues,
        showPassword: !confirmPasswordValues.showPassword,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data, e) => {
    Register(data);
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
                width: { xs: "60%", md: "30%" },
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
                <div
                  style={{
                    textAlign: "center",
                    color: "black",
                    marginBottom: "10px",
                    fontSize: "40px",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                  }}
                >
                  Agenda Tu Curso
                </div>
              </Box>
              <div
                style={{
                  textAlign: "center",
                  color: "black",
                  marginBottom: "25px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                Regístrate Gratis
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    type="text"
                    fullWidth
                    name="name"
                    label="Nombre:"
                    error={errors.name ? true : false}
                    helperText={errors?.name?.message}
                    {...register("name", {
                      required: {
                        value: true,
                        message: "El nombre es requerido",
                      },
                      maxLength: {
                        value: 100,
                        message: "Maximo 100 caracteres",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    type="text"
                    fullWidth
                    name="last_name"
                    label="Apellido:"
                    error={errors.last_name ? true : false}
                    helperText={errors?.last_name?.message}
                    {...register("last_name", {
                      required: {
                        value: true,
                        message: "El apellido es requerido",
                      },
                      maxLength: {
                        value: 100,
                        message: "Maximo 100 caracteres",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <TextField
                    type="email"
                    fullWidth
                    name="email"
                    label="Correo Electronico:"
                    error={errors.email ? true : false}
                    helperText={errors?.email?.message}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "El email es requerido",
                      },
                      maxLength: {
                        value: 100,
                        message: "Maximo 100 caracteres",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <TextField
                    type="number"
                    fullWidth
                    name="phone"
                    label="Teléfono:"
                    error={errors.phone ? true : false}
                    helperText={errors?.phone?.message}
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "El teléfono es requerido",
                      },
                      maxLength: {
                        value: 15,
                        message: "Maximo 15 caracteres",
                      }
                    })}
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    type={passwordValues.showPassword ? "text" : "password"}
                    id="password"
                    fullWidth
                    name="password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword("password")}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {passwordValues.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label="Contraseña:"
                    error={errors.password ? true : false}
                    helperText={errors?.password?.message}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "La contraseña es requerida",
                      },
                      minLength: {
                        value: 8,
                        message: "Minimo 8 caracteres",
                      },
                      maxLength: {
                        value: 255,
                        message: "Maximo 50 caracteres",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    type={
                      confirmPasswordValues.showPassword ? "text" : "password"
                    }
                    fullWidth
                    name="password_confirmation"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              handleClickShowPassword("password_confirmation")
                            }
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {confirmPasswordValues.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label="Confirmar Contraseña:"
                    error={errors.password_confirmation ? true : false}
                    helperText={errors?.password_confirmation?.message}
                    {...register("password_confirmation", {
                      required: {
                        value: true,
                        message: "Es requerido Confirmar la contraseña",
                      },
                      minLength: {
                        value: 8,
                        message: "Minimo 8 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Maximo 50 caracteres",
                      },
                    })}
                  />
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
                    backgroundColor: "#041954 ",
                    color: "white",
                  },
                }}
              >
                Registrarme
              </Button>
              <Link to="iniciar-sesion">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#041954",
                    color: "white",
                    fontWeight: "bold",
                    mt: 0,
                    mb: 6,
                    "&:hover": {
                      backgroundColor: "#041954",
                      color: "white",
                    },
                  }}
                >
                  regresar
                </Button>
              </Link>
            </Box>
          </div>
        </Grid>
      </div>
    </form>
  );
};

export default Register;
