import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import TableCategorias from "../../components/Tables/TableCategorias";
import CategoriasContext from "../../context/Categorias/CategoriasContext";
import AddCategorias from "./AddCategorias";

const Categorias = () => {
  const { categorias, GetCategories } = useContext(CategoriasContext);

  useEffect(() => {
    GetCategories();
  }, []);
  
  const [openModal, setOpenModal] = useState(false);
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
            Categorías
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            fullWidth
            sx={{
              color: "white",
              backgroundColor: "#F05E29",
              "&:hover": {
                color: "white",
                backgroundColor: "#F05E29",
                scale: "1.2",
              },
            }}
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableCategorias categorias={categorias} />
        </Grid>
      </Grid>
      <AddCategorias modal={openModal} handleClose={handleClose} />
    </Layout>
  );
};

export default Categorias;
