import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import UsuariosContext from "../../context/Usuarios/UsuariosContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddPersonasMorales({ modal, handleCloseMoral }) {
  const { AddPersonaMorales } = React.useContext(UsuariosContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = (data) => {
    AddPersonaMorales(data);
    handleCloseMoral();
  };
  const [passwordValues, setPasswordValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [confirmPasswordValues, setConfirmPasswordValues] = React.useState({
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
  return (
    <BootstrapDialog
      onClose={handleCloseMoral}
      aria-labelledby="customized-dialog-title"
      open={modal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleCloseMoral}
      >
        Agregar persona moral
      </BootstrapDialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter")
            e.preventDefault();
        }}
      >
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Razón social"
                {...register("razon_social", {
                  required: "La razon social es obligatoria",
                  maxLength: { value: 50, message: "Máximo 50 caracteres" },
                })}
                error={!!errors.razon_social}
                helperText={errors.razon_social?.message}
              />
            </Grid>
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
                  onChange: (e) => {
                    e.target.value = e.target.value.toUpperCase();
                  },
                })}
                inputProps={{
                  style: { textTransform: "uppercase" },
                }}
                error={!!errors.rfc}
                helperText={errors.rfc?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Representante legal"
                {...register("representante_legal", {
                  required: "El representante legal es obligatorio",
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
                error={!!errors.representante_legal}
                helperText={errors.representante_legal?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Domicilio fiscal"
                {...register("domicilio_fiscal", {
                  required: "El domicilio fiscal es obligatorio",
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.domicilio_fiscal}
                helperText={errors.domicilio_fiscal?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                fullWidth
                label="Correo electrónico"
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" },
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
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                  maxLength: { value: 15, message: "Máximo 15 caracteres" },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Tipo de usuario"
                {...register("type_user", { required: "Selecciona un tipo" })}
                error={!!errors.type_user}
                helperText={errors.type_user?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona --</em>
                </MenuItem>
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Instructor</MenuItem>
                <MenuItem value={3}>Cliente</MenuItem>
                <MenuItem value={6}>Subadministrador</MenuItem>
              </TextField>
            </Grid>
            {[1, 2, 6].includes(watch("type_user")) && (
              <Grid item xs={12}>
                <TextField
                  type="number"
                  fullWidth
                  label="Número de Colaborador"
                  {...register("collaborator_number", {
                    required: "El número de colaborador es obligatorio",
                    maxLength: { value: 6, message: "Máximo 6 caracteres" },
                  })}
                  error={!!errors.collaborator_number}
                  helperText={errors.collaborator_number?.message}
                />
              </Grid>
            )}
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
                    value: 50,
                    message: "Maximo 50 caracteres",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                type={confirmPasswordValues.showPassword ? "text" : "password"}
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
                label="Confirma la contraseña:"
                error={errors.password_confirmation ? true : false}
                helperText={errors?.password_confirmation?.message}
                {...register("password_confirmation", {
                  required: {
                    value: true,
                    message: "Es requerido confirmar la contraseña",
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
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              color: "white",
              backgroundColor: "#1976D2",
              "&:hover": {
                color: "white",
                backgroundColor: "#1976D2",
              },
            }}
          >
            Agregar
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}
