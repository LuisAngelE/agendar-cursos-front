import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Grid, TextField, Box, Typography } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState, useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "react-hook-form";
import MethodGet from "../../config/service";
import {
  LocalizationProvider,
  StaticDatePicker,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/es";
import AgendaContext from "../../context/Agenda/AgendaContext";
import SelectState from "../../components/SelectOptions/SelectState";
import SelectMunicipality from "../../components/SelectOptions/SelectMunicipality";

export default function EditAgenda({ open, handleClose, id, cursos }) {
  const { UpdateAgendas } = useContext(AgendaContext);
  const [agenda, saveAgenda] = useState(null);
  const [fechas, setFechas] = useState([]);

  useEffect(() => {
    MethodGet("/course-schedules/dates")
      .then((res) => setFechas(res.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
  if (agenda?.start_date) {
    setValue(dayjs(agenda.start_date));
  }
}, [agenda]);

  const [state, saveState] = useState(null);
  const [municipality, saveMunicipality] = useState(null);

  const detectarCambiosState = (value) => saveState(value);
  const detectarCambiosMunicipality = (value) => saveMunicipality(value);

  useEffect(() => {
    let url = `/courseSchedule/${id}`;
    MethodGet(url)
      .then((res) => {
        saveAgenda(res.data);
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

  const [value, setValue] = useState(dayjs());

  const onSubmit = (data, e) => {
    data.id = id;
    data.course_id = cursos[0].course_id;
    data.start_date = value.format("YYYY-MM-DD HH:mm:ss");
    data.state_id = state?.value || agenda.state_id;
    data.municipality_id = municipality?.value || agenda.municipality_id;
    UpdateAgendas(data);
    handleClose();
  };

  const countEventsByDate = (date) => {
    if (!Array.isArray(fechas)) return 0;
    return fechas.filter((e) => dayjs(e.start_date).isSame(date, "day")).length;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue) return;
    const [hour, minute] = inputValue.split(":").map(Number);
    setValue((prev) => dayjs(prev).hour(hour).minute(minute));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar reservación</DialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
          }
        }}
      >
        <DialogContent dividers>
          {agenda && (
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
                        const isPastDate = date.isBefore(today, "day");

                        const isWeekend = day === 0 || day === 6;

                        const alreadyThree = countEventsByDate(date) >= 6;

                        return isWeekend || isPastDate || alreadyThree;
                      }}
                    />

                    <Typography variant="subtitle1">
                      Selecciona la hora
                    </Typography>
                    <TextField
                      type="time"
                      fullWidth
                      value={value.format("HH:mm")}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (
                          (e.key === "Backspace" || e.key === "Delete") &&
                          e.target.value === ""
                        ) {
                          e.preventDefault();
                        }
                      }}
                      inputProps={{
                        step: 60,
                        min: "08:00",
                        max: "16:00",
                      }}
                    />
                  </Box>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <SelectState
                  detectarCambiosState={detectarCambiosState}
                  defaultValue={agenda.state}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectMunicipality
                  detectarCambiosMunicipality={detectarCambiosMunicipality}
                  state_id={state?.value || agenda.state_id}
                  defaultValue={agenda.municipality}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  defaultValue={agenda.location}
                  label="Ingresa la referencia del lugar donde tomarás el curso."
                  multiline
                  rows={2}
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
          )}
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
            Actualizar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
