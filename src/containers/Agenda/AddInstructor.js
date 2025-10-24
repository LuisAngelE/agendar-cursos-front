import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
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
      <DialogTitle>Agregar instructor</DialogTitle>
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
                label="Selecciona un instructor"
                defaultValue=""
                {...register("instructor_id", {
                  required: "Debes seleccionar un instructor",
                })}
                error={!!errors.instructor_id}
                helperText={errors.instructor_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona una instructor --</em>
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} {user.first_last_name} {user.second_last_name}
                    {user.razon_social}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#1976D2",
              color: "white",
              "&:hover": {
                bgcolor: "#1976D2",
                boxShadow: 3,
                transform: "scale(1.05)",
              },
              borderRadius: 3,
              py: 1.5,
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
            }}
            component={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            Agregar instructor
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
