import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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
      return "#0000CD";
    case 4:
      return "#B22222";
    default:
      return "#808080";
  }
};

export default function TableAgenda({ agendas }) {
  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de categorias">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Curso</StyledTableCell>
              <StyledTableCell>Fecha Solicitada </StyledTableCell>
              <StyledTableCell>Locación</StyledTableCell>
              <StyledTableCell>Solicitante</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendas.length > 0 ? (
              agendas.map((agendas) => (
                <StyledTableRow key={agendas.id}>
                  <StyledTableCell data-label="ID">
                    {agendas.id}
                  </StyledTableCell>
                  <StyledTableCell data-label="Curso">
                    {agendas.course?.title}
                    <br />
                    {agendas.course?.description}
                    <br />
                    {agendas.course?.duration}
                  </StyledTableCell>
                  <StyledTableCell data-label="Fecha Agendada">
                    {new Date(agendas.start_date).toLocaleString("es-ES", {
                      dateStyle: "long",
                      timeStyle: "short",
                      hour12: true,
                    })}
                  </StyledTableCell>
                  <StyledTableCell data-label="Locación">
                    {agendas.location}
                  </StyledTableCell>
                  <StyledTableCell data-label="Alumno">
                    {agendas.reservations[0]?.student?.name}{" "}
                    {agendas.reservations[0]?.student?.last_name}
                    {agendas.reservations[0]?.student?.razon_social}
                  </StyledTableCell>
                  <StyledTableCell
                    data-label="Status"
                    style={{
                      color: getStatusColor(agendas.reservations[0].status),
                    }}
                  >
                    {{
                      1: "Pendiente",
                      2: "Confirmada",
                      3: "Asistida",
                      4: "Cancelada",
                    }[agendas.reservations[0].status] || "Desconocido"}
                  </StyledTableCell>
                  <StyledTableCell data-label="Acciones">
                    <IconButton size="small">
                      <Tooltip title="Agregar Instructor" placement="top">
                        <ControlPointIcon sx={{ color: "blue" }} />
                      </Tooltip>
                    </IconButton>
                    <IconButton size="small">
                      <Tooltip title="Aceptar Agendación" placement="top">
                        <CheckCircleOutlineIcon sx={{ color: "green" }} />
                      </Tooltip>
                    </IconButton>
                    <IconButton size="small">
                      <Tooltip title="Cancelar Agendación" placement="top">
                        <HighlightOffIcon sx={{ color: "red" }} />
                      </Tooltip>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay Cursos Agendados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerResponsive>
    </>
  );
}
