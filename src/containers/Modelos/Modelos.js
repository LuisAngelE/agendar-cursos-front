import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import TableModelos from "../../components/Tables/TableModelos";
import AddModelos from "./AddModelos";
import ModelosContext from "../../context/Modelos/ModelosContext";

const Modelos = () => {
  const { modelos, GetModelos } = useContext(ModelosContext);

  useEffect(() => {
    GetModelos();
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
            Modelos
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
          <TableModelos modelos={modelos} />
        </Grid>
      </Grid>
      <AddModelos modal={openModal} handleClose={handleClose} modelos={modelos} />
    </Layout>
  );
};

export default Modelos;
