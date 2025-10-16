import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import TableCategorias from "../../components/Tables/TableCategorias";
import CategoriasContext from "../../context/Categorias/CategoriasContext";
import AddCategorias from "./AddCategorias";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

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
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#1976D2",
              color: "white",
              "&:hover": {
                bgcolor: "#1976D2",
                boxShadow: 3,
                transform: "scale(1.05)",
              },
              borderRadius: 3,
              py: 1.5,
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
            }}
            component={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            <AddIcon sx={{ mr: 1 }} />
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
