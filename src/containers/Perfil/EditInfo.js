import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/Auth/AuthContext";
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

export default function EditInfo({ modal, handleClose, User }) {
  const { EditInfo } = React.useContext(AuthContext);
  const type_user = localStorage.getItem("type_user");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const payload = {
      ...data,
      type_person: User.type_person,
    };
    EditInfo(payload);
    handleClose();
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Editar mi Información
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
              {User.type_person === 4 && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      fullWidth
                      name="nombre"
                      variant="outlined"
                      defaultValue={User.name}
                      label="Nombre:"
                      {...register("name", {
                        required: "El nombre es requerido",
                        minLength: { value: 1, message: "Mínimo 1 caracteres" },
                        maxLength: {
                          value: 100,
                          message: "Máximo 100 caracteres",
                        },
                      })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      fullWidth
                      name="last_name"
                      variant="outlined"
                      defaultValue={User.last_name}
                      label="Apellido:"
                      {...register("last_name", {
                        required: "El apellido es obligatorio",
                        minLength: { value: 1, message: "Mínimo 1 caracteres" },
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
                      defaultValue={
                        User.birth_date ? User.birth_date.split("T")[0] : ""
                      }
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
                      defaultValue={User.curp}
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
              {User.type_person === 5 && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      defaultValue={User.razon_social}
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
                      defaultValue={User.representante_legal}
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
                      defaultValue={User.domicilio_fiscal}
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
                  defaultValue={User.rfc}
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
                  name="email"
                  variant="outlined"
                  defaultValue={User.email}
                  label="Correo electrónico:"
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
                  name="phone"
                  variant="outlined"
                  defaultValue={User.phone}
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
              {(type_user === "1" || type_user === "2") && (
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Número de Colaborador"
                    defaultValue={User.collaborator_number}
                    {...register("collaborator_number", {
                      required: "El número de colaborador es obligatorio",
                      maxLength: { value: 6, message: "Máximo 6 caracteres" },
                    })}
                    error={!!errors.collaborator_number}
                    helperText={errors.collaborator_number?.message}
                  />
                </Grid>
              )}
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
                backgroundColor: "#1C277D",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#1C277D",
                },
              }}
            >
              Guardar
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
