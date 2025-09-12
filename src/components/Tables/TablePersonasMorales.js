import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import UsuariosContext from "../../context/Usuarios/UsuariosContext";
import EditPersonasMorales from "../../containers/PersonasMorales/EditPersonasMorales";

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

export default function TablePersonasMorales({ users }) {
  const { DeleteUsersMorales } = useContext(UsuariosContext);
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
        <Table aria-label="tabla de usuarios">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Tipo de Persona</StyledTableCell>
              <StyledTableCell>Razon Social</StyledTableCell>
              <StyledTableCell>RFC</StyledTableCell>
              <StyledTableCell>Representante Legal</StyledTableCell>
              <StyledTableCell>Domicilio Fiscal</StyledTableCell>
              <StyledTableCell>Correo Electronico</StyledTableCell>
              <StyledTableCell>Telefono</StyledTableCell>
              <StyledTableCell>Tipo de Usuario</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell data-label="ID">{user.id}</StyledTableCell>
                  <StyledTableCell data-label="Tipo de Persona">
                    {{
                      4: "Física",
                      5: "Moral",
                    }[user.type_person] || "Desconocido"}
                  </StyledTableCell>
                  <StyledTableCell data-label="Razon Social">
                    {user.razon_social}
                  </StyledTableCell>
                  <StyledTableCell data-label="RFC">{user.rfc}</StyledTableCell>
                  <StyledTableCell data-label="Representante Legal">
                    {user.representante_legal}
                  </StyledTableCell>
                  <StyledTableCell data-label="Domicilio Fiscal">
                    {user.domicilio_fiscal}
                  </StyledTableCell>
                  <StyledTableCell data-label="Correo Electrónico">
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell data-label="Teléfono">
                    {user.phone}
                  </StyledTableCell>
                  <StyledTableCell data-label="Tipo de Usuario">
                    {{
                      1: "Administrador",
                      2: "Instructor",
                      3: "Alumno",
                    }[user.type_user] || "Desconocido"}
                  </StyledTableCell>

                  <StyledTableCell data-label="Acciones">
                    <IconButton
                      size="small"
                      onClick={() => handleClickOpen(user.id)}
                    >
                      <Tooltip title="Editar Usuario" placement="top">
                        <EditIcon sx={{ color: "#e7a62f" }} />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => DeleteUsersMorales(user.id)}
                    >
                      <Tooltip title="Eliminar Usuario" placement="top">
                        <DeleteIcon sx={{ color: "#FF0000" }} />
                      </Tooltip>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No hay usuarios disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerResponsive>
      {id_service !== null && (
        <EditPersonasMorales
          open={modalUpdate}
          handleClose={handleClickClose}
          id={id_service}
        />
      )}
    </>
  );
}
