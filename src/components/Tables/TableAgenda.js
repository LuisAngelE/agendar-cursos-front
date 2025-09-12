import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import AddInstructor from "../../containers/Agenda/AddInstructor";
import AgendaContext from "../../context/Agenda/AgendaContext";
import EditAgenda from "../../containers/Agenda/EditAgenda";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1C277D",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
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
  const { AcceptAgendation, CanceledAgendation, DeleteAgendation } = useContext(AgendaContext);
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
              <StyledTableCell>Fecha de Creación</StyledTableCell>
              <StyledTableCell>Curso</StyledTableCell>
              <StyledTableCell>Fecha Solicitada</StyledTableCell>
              <StyledTableCell>Locación</StyledTableCell>
              <StyledTableCell>Solicitante</StyledTableCell>
              <StyledTableCell>Instructor</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendas.length > 0 ? (
              agendas.map((agenda) => (
                <StyledTableRow key={agenda.id}>
                  <StyledTableCell data-label="ID">{agenda.id}</StyledTableCell>
                  <StyledTableCell data-label="Fecha Creación">
                    {new Date(agenda.created_at).toLocaleString("es-ES", {
                      dateStyle: "long",
                      timeStyle: "short",
                      hour12: true,
                    })}
                  </StyledTableCell>
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
                    {agenda.location}
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
                    {agenda.instructor?.name ||
                      agenda.instructor?.last_name ||
                      agenda.instructor?.razon_social ||
                      "Sin Instructor"}
                  </StyledTableCell>
                  <StyledTableCell
                    data-label="Status"
                    style={{
                      color: getStatusColor(
                        agenda.reservations?.[0]?.status || 0
                      ),
                    }}
                  >
                    {{
                      1: "Pendiente de Confirmación",
                      2: "Agendación Confirmada",
                      3: "Agendación Cancelada",
                      4: "Clase Realizada",
                    }[agenda.reservations?.[0]?.status] || "Desconocido"}
                  </StyledTableCell>
                  <StyledTableCell data-label="Acciones">
                    {agenda.reservations?.[0]?.status === 1 &&
                      type_user === "1" &&
                      !agenda.instructor_id && (
                        <IconButton
                          size="small"
                          onClick={() => handleOpenInstructor(agenda.id)}
                        >
                          <Tooltip title="Agregar Instructor" placement="top">
                            <AccountCircleIcon sx={{ color: "blue" }} />
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
                          <Tooltip title="Aceptar Agendación" placement="top">
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
                            <Tooltip title="Editar Agendación" placement="top">
                              <EditIcon sx={{ color: "#e7a62f" }} />
                            </Tooltip>
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => DeleteAgendation(agenda.id)}
                          >
                            <Tooltip
                              title="Eliminar Agendación"
                              placement="top"
                            >
                              <DeleteIcon sx={{ color: "#FF0000" }} />
                            </Tooltip>
                          </IconButton>
                        </>
                      )}

                    {agenda.reservations?.[0]?.status === 2 &&
                      (type_user === "1" || type_user === "2") && (
                        <IconButton
                          size="small"
                          onClick={() =>
                            CanceledAgendation(agenda.reservations?.[0]?.id)
                          }
                        >
                          <Tooltip title="Cancelar Agendación" placement="top">
                            <HighlightOffIcon sx={{ color: "red" }} />
                          </Tooltip>
                        </IconButton>
                      )}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No hay Cursos Agendados
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
