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
import CursosContext from "../../context/Cursos/CursosContext";
import { useEffect } from "react";
import { useState } from "react";
import MethodGet from "../../config/service";

export default function AgendaModal({ open, handleClose, id }) {
  const { cursos, GetCursos } = useContext(CursosContext);
  const { AddAgendas } = useContext(AgendaContext);
  let type_user = localStorage.getItem("type_user");
  const [fechas, setFechas] = useState([]);

  useEffect(() => {
    MethodGet("/course-schedules/dates")
      .then((res) => setFechas(res.data))
      .catch(console.log);
  }, []);

  const [state, saveState] = useState(null);
  const detectarCambiosState = (value) => {
    saveState(value.value);
  };

  const [municipality, saveMunicipality] = useState(null);
  const detectarCambiosMunicipality = (value) => {
    saveMunicipality(value.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [value, setValue] = useState(dayjs());

  const onSubmit = (data) => {
    data.course_id = id;
    data.start_date = value.format("YYYY-MM-DD HH:mm:ss");
    data.state_id = state;
    data.municipality_id = municipality;
    AddAgendas(data);
    handleClose();
  };

  useEffect(() => {
    GetCursos();
  }, []);

  const countEventsByDate = (date) => {
    if (!Array.isArray(fechas)) return 0;
    return fechas.filter((e) => dayjs(e.start_date).isSame(date, "day")).length;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> Me interesa este curso</DialogTitle>
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
                      const isPastDate = date.isBefore(today, "day");

                      const alreadyThree = countEventsByDate(date) >= 6;

                      if (Number(type_user) === 1) {
                        return isPastDate || alreadyThree;
                      } else {
                        const isWeekend = day === 0 || day === 6;
                        return isWeekend || isPastDate || alreadyThree;
                      }
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
                      {[8, 9, 10, 11, 12, 13, 14, 15, 16].map((h) => {
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
                        return timeValue < 8 || timeValue > 16;
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
                label="Ingresa la referencia del lugar donde tomarás el curso."
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
              backgroundColor: "#1976D2",
              "&:hover": {
                color: "white",
                backgroundColor: "#1976D2",
              },
            }}
          >
            Agendar curso
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
