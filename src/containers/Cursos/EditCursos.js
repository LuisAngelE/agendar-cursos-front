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
import { Grid, MenuItem } from "@mui/material";
import CursosContext from "../../context/Cursos/CursosContext";

export default function EditCursos({ open, handleClose, id, users }) {
  const { UpdateCursos } = useContext(CursosContext);
  const [course, saveCourse] = useState(null);

  useEffect(() => {
    let url = `/course/${id}`;
    MethodGet(url)
      .then((res) => {
        saveCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    data.id = id;
    UpdateCursos(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Usuario Fisico</DialogTitle>
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
          {course && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Selecciona el instructor"
                  defaultValue={course.instructor_id}
                  {...register("instructor_id", {
                    required: "Debes seleccionar un instructor",
                  })}
                  error={!!errors.instructor_id}
                  helperText={errors.instructor_id?.message}
                >
                  <MenuItem value="">
                    <em>-- Selecciona un instructor --</em>
                  </MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name} {user.last_name} {user.razon_social}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título del curso"
                  defaultValue={course.title}
                  {...register("title", {
                    required: "El título es obligatorio",
                    minLength: { value: 1, message: "Mínimo 1 caracteres" },
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción del curso"
                  defaultValue={course.description}
                  multiline
                  rows={4}
                  {...register("description", {
                    required: "La descripción es obligatoria",
                    minLength: { value: 1, message: "Mínimo 1 caracteres" },
                    maxLength: { value: 500, message: "Máximo 500 caracteres" },
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Modalidad del curso"
                  defaultValue={course.modality}
                  {...register("modality", {
                    required: "La Modalidad es obligatoria",
                    minLength: { value: 1, message: "Mínimo 1 caracteres" },
                    maxLength: { value: 50, message: "Máximo 50 caracteres" },
                  })}
                  error={!!errors.modality}
                  helperText={errors.modality?.message}
                />
              </Grid>
            </Grid>
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
