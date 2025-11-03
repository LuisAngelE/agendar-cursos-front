import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { motion, AnimatePresence } from "framer-motion";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E3F2FD",
    color: "black",
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

export default function TableCursos({ cursos }) {
  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de categorias">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Descripción</StyledTableCell>
              <StyledTableCell>Categoría</StyledTableCell>
              <StyledTableCell>Modelo</StyledTableCell>
              <StyledTableCell>Modalidad</StyledTableCell>
              <StyledTableCell>Duración</StyledTableCell>
              <StyledTableCell>Propietario</StyledTableCell>
              <StyledTableCell>Estatus</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {cursos.length > 0 ? (
                cursos.map((curso) => (
                  <StyledTableRow
                    key={curso.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#E3F2FD" }}
                  >
                    <StyledTableCell data-label="ID">
                      {curso.id}
                    </StyledTableCell>
                    <StyledTableCell data-label="Nombre">
                      {curso.title}
                    </StyledTableCell>
                    <StyledTableCell data-label="Descripción">
                      {curso.description}
                    </StyledTableCell>
                    <StyledTableCell data-label="Categoría">
                      {curso.category.name}
                    </StyledTableCell>
                    <StyledTableCell data-label="Modelo">
                      {curso.models.nombre_segmento} {""}{" "}
                      {curso.models.nombre_tipo_unidad}
                    </StyledTableCell>
                    <StyledTableCell data-label="Modalidad">
                      {curso.modality}
                    </StyledTableCell>
                    <StyledTableCell data-label="Duración">
                      {curso.duration}
                    </StyledTableCell>
                    <StyledTableCell data-label="Propietario">
                      {curso.user.name} {curso.user.first_last_name}{" "}
                      {curso.user.second_last_name}
                      {curso.user.razon_social}
                    </StyledTableCell>
                    <StyledTableCell data-label="Estatus">
                      {curso.status ? "Activo" : "Inactivo"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No hay cursos disponibles
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainerResponsive>
    </>
  );
}
