import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import UsuariosContext from "../../context/Usuarios/UsuariosContext";
import AgendaContext from "../../context/Agenda/AgendaContext";

export default function AddInstructor({ modal, handleClose, id }) {
  const { users, GetInstructores } = React.useContext(UsuariosContext);
  const { AddInstructor } = React.useContext(AgendaContext);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  React.useEffect(() => {
    GetInstructores();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    data.agenda_id = id;
    AddInstructor(data);
    handleClose();
  };

  return (
    <Dialog
      open={modal}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle>Agregar Instructor</DialogTitle>
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
                select
                fullWidth
                label="Selecciona un Instructor"
                defaultValue=""
                {...register("instructor_id", {
                  required: "Debes seleccionar un Instructor",
                })}
                error={!!errors.instructor_id}
                helperText={errors.instructor_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona una instructor --</em>
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} {user.last_name}
                    {user.razon_social}
                  </MenuItem>
                ))}
              </TextField>
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
              backgroundColor: "#F05E29",
              "&:hover": {
                color: "white",
                backgroundColor: "#F05E29",
              },
            }}
          >
            Agregar Instructor
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
