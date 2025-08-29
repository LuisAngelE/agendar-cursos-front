import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import MethodGet from "../../config/service";
import UsuariosContext from "../../context/Usuarios/UsuariosContext";
import { MenuItem } from "@mui/material";

export default function EditUsuario({ open, handleClose, id }) {

  const { UpdateUser } = useContext(UsuariosContext);
  const [users, saveUsers] = useState(null);
  useEffect(() => {
    let url = `/users/${id}`;
    MethodGet(url)
      .then((res) => {
        saveUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const reset = () => {
    setValue("nombre", "", { shouldDirty: true });
  };
  const onSubmit = (data, e) => {
    data.id = id;
    UpdateUser(data);
    handleClose();
    reset();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Usuario</DialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
          }
        }}
      >
        <DialogContent>
          {users && (
            <>
              <TextField
                type="text"
                fullWidth
                name="nombre"
                variant="outlined"
                defaultValue={users.name}
                label="Nombre:"
                {...register("nombre", {
                  required: "Este campo es requerido",
                  minLength: { value: 4, message: "Mínimo 4 caracteres" },
                  maxLength: { value: 255, message: "Máximo 255 caracteres" },
                })}
                sx={{ mb: 2 }}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                type="text"
                fullWidth
                name="last_name"
                variant="outlined"
                defaultValue={users.last_name}
                label="Apellido:"
                {...register("last_name", {
                  required: "El apellido es obligatorio",
                  maxLength: { value: 255, message: "Máximo 255 caracteres" },
                })}
                sx={{ mb: 2 }}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
              <TextField
                type="email"
                fullWidth
                name="email"
                variant="outlined"
                defaultValue={users.email}
                label="Correo electrónico:"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Correo inválido",
                  },
                })}
                sx={{ mb: 2 }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                type="number"
                fullWidth
                name="phone"
                variant="outlined"
                defaultValue={users.phone}
                label="Teléfono"
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                  maxLength: { value: 15, message: "Máximo 15 caracteres" },
                })}
                sx={{ mb: 2 }}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                select
                fullWidth
                label="Tipo de Usuario"
                defaultValue=""
                {...register("type_user")}
                error={!!errors.type_user}
                helperText={errors.type_user?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona --</em>
                </MenuItem>
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Instructor</MenuItem>
                <MenuItem value={3}>Alumno</MenuItem>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Actualizar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
