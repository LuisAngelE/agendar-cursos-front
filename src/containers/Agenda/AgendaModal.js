import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { Grid, TextField, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  LocalizationProvider,
  StaticDatePicker,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useContext } from "react";
import AgendaContext from "../../context/Agenda/AgendaContext";
import "dayjs/locale/es";
import SelectState from "../../components/SelectOptions/SelectState";
import SelectMunicipality from "../../components/SelectOptions/SelectMunicipality";

export default function AgendaModal({ open, handleClose, id, curso }) {
  const { AddAgendas } = useContext(AgendaContext);
  let type_user = localStorage.getItem("type_user");  
  
  const [state, saveState] = React.useState(null);
  const detectarCambiosState = (value) => {
    saveState(value.value);
  };

  const [municipality, saveMunicipality] = React.useState(null);
  const detectarCambiosMunicipality = (value) => {
    saveMunicipality(value.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [value, setValue] = React.useState(dayjs());

  const onSubmit = (data) => {
    data.course_id = id;
    data.start_date = value.format("YYYY-MM-DD HH:mm:ss");
    data.state_id = state;
    data.municipality_id = municipality;
    AddAgendas(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> Me Interesa Este Curso</DialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter")
            e.preventDefault();
        }}
      >
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography variant="subtitle1">
                    Selecciona la fecha
                  </Typography>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={value}
                    onChange={(newValue) =>
                      setValue(
                        newValue.hour(value.hour()).minute(value.minute())
                      )
                    }
                    shouldDisableDate={(date) => {
                      const today = dayjs();
                      const day = date.day();
                    
                      // No permitir fines de semana ni fechas pasadas
                      const isWeekend = day === 0 || day === 6;
                      const isPastDate = date.isBefore(today, "day");

                      // Contar cuántos horarios hay para este curso en esa fecha
                      const countForThisDay =
                        curso?.schedules?.filter((schedule) =>
                          date.isSame(dayjs(schedule.start_date), "day")
                        ).length ?? 0;

                      // Si ya hay 3 o más en ese día, bloquear ese día
                      const isFullDay = countForThisDay >= 3;

                      return isWeekend || isPastDate || isFullDay;
                    }}
                  />

                  <Typography variant="subtitle1">
                    Selecciona la hora (select)
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="hour-label">Hora</InputLabel>
                    <Select
                      labelId="hour-label"
                      value={value.format("HH:mm")}
                      label="Hora"
                      onChange={(e) => {
                        const [hour, minute] = e.target.value
                          .split(":")
                          .map(Number);
                        setValue(value.hour(hour).minute(minute));
                      }}
                    >
                      {[8, 9, 10, 11, 12, 13, 14].map((h) => {
                        const hourStr = String(h).padStart(2, "0");
                        return (
                          <MenuItem key={h} value={`${hourStr}:00`}>
                            {`${hourStr}:00`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <Typography variant="subtitle1">
                    Selecciona la hora (reloj)
                  </Typography>
                  <StaticTimePicker
                    displayStaticWrapperAs="desktop"
                    value={value}
                    onChange={(newValue) => {
                      setValue(
                        value.hour(newValue.hour()).minute(newValue.minute())
                      );
                    }}
                    shouldDisableTime={(timeValue, clockType) => {
                      if (clockType === "hours")
                        return timeValue < 8 || timeValue > 14;
                      return false;
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <SelectState detectarCambiosState={detectarCambiosState} />
            </Grid>
            {state !== null && (
              <Grid item xs={12}>
                <SelectMunicipality
                  detectarCambiosMunicipality={detectarCambiosMunicipality}
                  state_id={state}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ingresa tu localidad donde tomarás el curso"
                multiline
                rows={4}
                {...register("location", {
                  required: "La localidad es obligatoria",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
                error={!!errors.location}
                helperText={errors.location?.message}
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
              backgroundColor: "#F05E29",
              "&:hover": {
                color: "white",
                backgroundColor: "#F05E29",
              },
            }}
          >
            Agendar Curso
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
