import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import AddInstructor from "../../containers/Agenda/AddInstructor";
import AgendaContext from "../../context/Agenda/AgendaContext";
import EditAgenda from "../../containers/Agenda/EditAgenda";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1C277D",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableContainerResponsive = styled(TableContainer)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& thead": {
      display: "none",
    },
    "& tbody tr": {
      display: "block",
      marginBottom: "15px",
    },
    "& td": {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 5px",
      borderBottom: "1px solid #000000ff",
      "&:before": {
        content: "attr(data-label)",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      "&:last-child": {
        borderBottom: 0,
      },
    },
  },
}));

const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "#FF4500";
    case 2:
      return "#008000";
    case 3:
      return "#B22222";
    case 4:
      return "#0000CD";

    default:
      return "#808080";
  }
};

export default function TableAgenda({ agendas }) {
  const { AcceptAgendation, CanceledAgendation, ClassDone, Reschedule } =
    useContext(AgendaContext);
  let type_user = localStorage.getItem("type_user");

  const [agenda_id, saveIdInstructor] = useState(null);
  const [modalInstrcutor, openModalInstructor] = useState(false);
  const handleOpenInstructor = (id) => {
    openModalInstructor(true);
    saveIdInstructor(id);
  };
  const handleCloseInstructor = () => {
    openModalInstructor(false);
    saveIdInstructor(null);
  };

  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_service, saveIdService] = useState(null);
  const handleClickOpen = (id) => {
    OpenModalUpdate(true);
    saveIdService(id);
  };
  const handleClickClose = () => {
    OpenModalUpdate(false);
    saveIdService(null);
  };

  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de categorias">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Curso</StyledTableCell>
              <StyledTableCell>Fecha Solicitada</StyledTableCell>
              <StyledTableCell>Locación</StyledTableCell>
              <StyledTableCell>Solicitante</StyledTableCell>
              <StyledTableCell>Instructor</StyledTableCell>
              <StyledTableCell>Estatus</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendas.length > 0 ? (
              agendas.map((agenda) => (
                <StyledTableRow key={agenda.id}>
                  <StyledTableCell data-label="ID">{agenda.id}</StyledTableCell>
                  <StyledTableCell data-label="Curso">
                    {agenda.course?.title}
                    <br />
                    {agenda.course?.modality}
                  </StyledTableCell>
                  <StyledTableCell data-label="Fecha Solicitada">
                    {new Date(agenda.start_date).toLocaleString("es-ES", {
                      dateStyle: "long",
                      timeStyle: "short",
                      hour12: true,
                    })}
                  </StyledTableCell>
                  <StyledTableCell data-label="Locación">
                    {agenda.state.name} {""}
                    {agenda.municipality.name}
                  </StyledTableCell>
                  <StyledTableCell data-label="Alumno">
                    {agenda.reservations?.[0]?.student ? (
                      <>
                        {agenda.reservations[0].student.name || ""}{" "}
                        {agenda.reservations[0].student.last_name || ""}{" "}
                        {agenda.reservations[0].student.razon_social || ""}
                      </>
                    ) : (
                      "Sin Alumno"
                    )}
                  </StyledTableCell>

                  <StyledTableCell data-label="Instructor">
                    {agenda.instructor ? (
                      `${agenda.instructor.name || ""} ${
                        agenda.instructor.last_name || ""
                      }`.trim()
                    ) : (
                      <span style={{ color: "red" }}>Sin Instructor</span>
                    )}
                  </StyledTableCell>

                  <StyledTableCell
                    data-label="Estatus"
                    style={{
                      color: getStatusColor(
                        agenda.reservations?.[0]?.status || 0
                      ),
                    }}
                  >
                    {{
                      1: "Pendiente de Confirmación",
                      2: "Reservación Confirmada",
                      3: "Reservación Cancelada",
                      4: "Reservación Realizada",
                    }[agenda.reservations?.[0]?.status] || "Desconocido"}
                  </StyledTableCell>
                  <StyledTableCell data-label="Acciones">
                    <Link to={`/Agenda/${agenda.id}`}>
                      <IconButton size="small">
                        <Tooltip
                          title="Detalle del curso reservado"
                          placement="top"
                        >
                          <VisibilityIcon sx={{ color: "blue" }} />
                        </Tooltip>
                      </IconButton>
                    </Link>

                    {agenda.reservations?.[0]?.status === 1 &&
                      type_user === "1" &&
                      !agenda.instructor_id && (
                        <IconButton
                          size="small"
                          onClick={() => handleOpenInstructor(agenda.id)}
                        >
                          <Tooltip title="Agregar Instructor" placement="top">
                            <AccountCircleIcon sx={{ color: "brown" }} />
                          </Tooltip>
                        </IconButton>
                      )}

                    {agenda.reservations?.[0]?.status === 1 &&
                      agenda.instructor_id &&
                      (type_user === "1" || type_user === "2") && (
                        <IconButton
                          size="small"
                          onClick={() =>
                            AcceptAgendation(agenda.reservations?.[0]?.id)
                          }
                        >
                          <Tooltip title="Aceptar Reservación" placement="top">
                            <CheckCircleOutlineIcon sx={{ color: "green" }} />
                          </Tooltip>
                        </IconButton>
                      )}

                    {agenda.reservations?.[0]?.status === 1 &&
                      type_user === "3" && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => handleClickOpen(agenda.id)}
                          >
                            <Tooltip title="Editar Reservación" placement="top">
                              <EditIcon sx={{ color: "#e7a62f" }} />
                            </Tooltip>
                          </IconButton>
                        </>
                      )}

                    {agenda.reservations?.[0]?.status === 3 &&
                      (type_user === "1" || type_user === "2") && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() =>
                              Reschedule(agenda.reservations?.[0]?.id)
                            }
                          >
                            <Tooltip
                              title="Reprogramar el curso"
                              placement="top"
                            >
                              <CachedIcon sx={{ color: "black" }} />
                            </Tooltip>
                          </IconButton>
                        </>
                      )}

                    {agenda.reservations?.[0]?.status === 2 &&
                      (type_user === "1" || type_user === "2") && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() =>
                              ClassDone(agenda.reservations?.[0]?.id)
                            }
                          >
                            <Tooltip title="¿Clase Realizada?" placement="top">
                              <StarIcon sx={{ color: "gold" }} />
                            </Tooltip>
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              CanceledAgendation(agenda.reservations?.[0]?.id)
                            }
                          >
                            <Tooltip
                              title="Cancelar Reservación"
                              placement="top"
                            >
                              <HighlightOffIcon sx={{ color: "red" }} />
                            </Tooltip>
                          </IconButton>
                        </>
                      )}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay Cursos Reservados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {agenda_id !== null && (
          <AddInstructor
            modal={modalInstrcutor}
            handleClose={handleCloseInstructor}
            id={agenda_id}
          />
        )}
        {id_service !== null && (
          <EditAgenda
            open={modalUpdate}
            handleClose={handleClickClose}
            id={id_service}
            cursos={agendas}
          />
        )}
      </TableContainerResponsive>
    </>
  );
}
