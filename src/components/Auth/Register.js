import {
  Box,
  Button,
  Grid,
  MenuItem,
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
  // backgroundLogin: {
  //   height: "100%",
  //   minHeight: "100vh",
  //   width: "100%",
  //   background:
  //     "linear-gradient(90deg,rgba(28, 39, 125, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(240, 94, 41, 1) 100%);",
  //   backgroundRepeat: "no-repeat",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  backgroundLogin: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(90deg,rgba(28, 39, 125, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(240, 94, 41, 1) 100%)",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
    overflowY: "auto",
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
  } = useForm();

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

  const [typePerson, setTypePerson] = useState("");

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
                p: 4,
                width: "100%",
                maxWidth: "500px",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className={classes.caja}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: "32px",
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
              ></div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Selecciona el Tipo de Persona"
                    defaultValue=""
                    {...register("type_person", {
                      required: "Selecciona el Tipo de Persona",
                    })}
                    error={!!errors.type_person}
                    helperText={errors.type_person?.message}
                    onChange={(e) => setTypePerson(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>-- Selecciona el Tipo de Persona --</em>
                    </MenuItem>
                    <MenuItem value={"4"}>Física</MenuItem>
                    <MenuItem value={"5"}>Moral</MenuItem>
                  </TextField>
                </Grid>
                {typePerson === "4" && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        {...register("name", {
                          required: "El nombre es obligatorio",
                          maxLength: {
                            value: 255,
                            message: "Máximo 255 caracteres",
                          },
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Apellido"
                        {...register("last_name", {
                          required: "El apellido es obligatorio",
                          maxLength: {
                            value: 255,
                            message: "Máximo 255 caracteres",
                          },
                        })}
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="date"
                        fullWidth
                        label="Fecha de Nacimiento"
                        InputLabelProps={{ shrink: true }}
                        {...register("birth_date", {
                          required: "La fecha de nacimiento es obligatoria",
                          maxLength: {
                            value: 255,
                            message: "Máximo 255 caracteres",
                          },
                        })}
                        error={!!errors.birth_date}
                        helperText={errors.birth_date?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="CURP"
                        {...register("curp", {
                          required: "La CURP es obligatoria",
                          pattern: {
                            value: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/,
                            message: "CURP inválida",
                          },
                        })}
                        error={!!errors.curp}
                        helperText={errors.curp?.message}
                      />
                    </Grid>
                  </>
                )}
                {typePerson === "5" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Razon Social"
                        {...register("razon_social", {
                          required: "La Razon Social es obligatoria",
                          maxLength: {
                            value: 50,
                            message: "Máximo 50 caracteres",
                          },
                        })}
                        error={!!errors.razon_social}
                        helperText={errors.razon_social?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Representante Legal"
                        {...register("representante_legal", {
                          required: "El Representante Legal es obligatorio",
                          maxLength: {
                            value: 100,
                            message: "Máximo 100 caracteres",
                          },
                        })}
                        error={!!errors.representante_legal}
                        helperText={errors.representante_legal?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Domicilio Fiscal"
                        {...register("domicilio_fiscal", {
                          required: "El Domicilio Fiscal es obligatorio",
                          maxLength: {
                            value: 200,
                            message: "Máximo 200 caracteres",
                          },
                        })}
                        error={!!errors.domicilio_fiscal}
                        helperText={errors.domicilio_fiscal?.message}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="RFC"
                    {...register("rfc", {
                      required: "El RFC es obligatorio",
                      pattern: {
                        value: /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/,
                        message: "RFC inválido",
                      },
                    })}
                    error={!!errors.rfc}
                    helperText={errors.rfc?.message}
                  />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Teléfono"
                    {...register("phone", {
                      required: "El teléfono es obligatorio",
                      minLength: {
                        value: 10,
                        message: "Mínimo 10 caracteres",
                      },
                      maxLength: {
                        value: 15,
                        message: "Máximo 15 caracteres",
                      },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
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
                        value: 16,
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
                    label="Confirma la Contraseña:"
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
              <Link to="iniciar-sesion" style={{ width: "100%" }}>
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
                  Iniciar Sesion
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
