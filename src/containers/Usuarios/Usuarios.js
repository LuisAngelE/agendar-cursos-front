import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import AddUsuarios from "../../containers/Usuarios/AddUsuarios";
import UsuariosContext from "../../context/Usuarios/UsuariosContext";
import TableUsers from "../../components/Tables/TableUsers";

const Usuarios = () => {
  const [openModal, setOpenModal] = useState(false);
  const { users, GetUsers } = useContext(UsuariosContext);

  useEffect(() => {
    GetUsers();
  }, []);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
          <Typography
            fontWeight="bold"
            fontFamily="monospace"
            variant="h5"
            sx={{ color: "black" }}
          >
            Usuarios
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleClickOpen}
            sx={{
              color: "white",
              backgroundColor: "#F05E29",
              "&:hover": {
                color: "white",
                backgroundColor: "#F05E29",
              },
            }}
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableUsers users={users} />
        </Grid>
      </Grid>
      <AddUsuarios modal={openModal} handleClose={handleClose} users={users} />
    </Layout>
  );
};

export default Usuarios;
