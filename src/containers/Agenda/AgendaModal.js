import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
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

export default function AgendaModal({ open, handleClose, id, curso }) {
  const { AddAgendas } = useContext(AgendaContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [value, setValue] = React.useState(dayjs());

  const onSubmit = (data) => {
    data.course_id = id;
    data.start_date = value.format("YYYY-MM-DD HH:mm:ss");
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
                      const day = date.day();
                      const today = dayjs();
                      const isWeekend = day === 0 || day === 6;
                      const isPastDate = date.isBefore(today, "day");

                      const isScheduled = curso.schedules.some((schedule) => {
                        const scheduledDate = dayjs(schedule.start_date);
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
