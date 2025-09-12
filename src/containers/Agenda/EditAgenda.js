import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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

export default function EditAgenda({ open, handleClose, id, cursos }) {  
  console.log(cursos);
  const { UpdateAgendas } = useContext(AgendaContext);
  const [agenda, saveAgenda] = useState(null);

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

  const [value, setValue] = React.useState(dayjs());

  const onSubmit = (data, e) => {
    data.id = id;
    data.course_id = cursos[0].course_id;
    data.start_date = value.format("YYYY-MM-DD HH:mm:ss");
    UpdateAgendas(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Agendación</DialogTitle>
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
                        const day = date.day();
                        const today = dayjs();
                        const isWeekend = day === 0 || day === 6;
                        const isPastDate = date.isBefore(today, "day");

                        const isScheduled = cursos.some((curso) => {
                          const scheduledDate = dayjs(curso.start_date);
                          return date.isSame(scheduledDate, "day");
                        });
                        return isWeekend || isPastDate || isScheduled;
                      }}
                    />
                    <Typography variant="subtitle1">
                      Selecciona la hora
                    </Typography>
                    <StaticTimePicker
                      displayStaticWrapperAs="desktop"
                      value={value}
                      onChange={(newValue) =>
                        setValue(
                          value
                            .date(newValue.date())
                            .hour(newValue.hour())
                            .minute(newValue.minute())
                        )
                      }
                      shouldDisableTime={(timeValue, clockType) => {
                        if (clockType === "hours") {
                          return timeValue < 8 || timeValue > 14;
                        }
                        return false;
                      }}
                    />
                  </Box>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  defaultValue={agenda.location}
                  label="Ingresa tu localidad donde tomarás el curso"
                  multiline
                  rows={4}
                  {...register("location", {
                    required: "La localidad es obligatoria",
                    minLength: { value: 10, message: "Mínimo 10 caracteres" },
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
              backgroundColor: "#1565c0",
              "&:hover": {
                color: "white",
                backgroundColor: "#1565c0",
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
