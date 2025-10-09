import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Layout from "../../components/layout/Layout";
import { useContext, useState, useEffect } from "react";
import UsuariosContext from "../../context/Usuarios/UsuariosContext";
import { Button, Grid } from "@mui/material";
import TablePersonasFisicas from "../../components/Tables/TablePersonasFisicas";
import TablePersonasMorales from "../../components/Tables/TablePersonasMorales";
import AddPersonasFisicas from "./AddPersonasFisicas";
import AddPersonasMorales from "./AddPersonasMorales";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Usuarios() {
  const { usersFisicos, GetUsersFisicos } = useContext(UsuariosContext);
  const { usersMorales, GetUsersMorales } = useContext(UsuariosContext);

  useEffect(() => {
    GetUsersFisicos();
    GetUsersMorales();
  }, []);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openModalFisica, setOpenModalFisica] = useState(false);
  const handleClickOpenFisica = () => {
    setOpenModalFisica(true);
  };
  const handleCloseFisica = () => {
    setOpenModalFisica(false);
  };

  const [openModalMoral, setOpenModalMoral] = useState(false);
  const handleClickOpenMoral = () => {
    setOpenModalMoral(true);
  };
  const handleCloseMoral = () => {
    setOpenModalMoral(false);
  };

  return (
    <Layout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Personas Físicas" {...a11yProps(0)} />
            <Tab label="Personas Morales" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent={{ xs: "center", md: "flex-end" }}
            sx={{ mb: 2 }}
          >
            <Grid item>
              <Button
                variant="contained"
                onClick={handleClickOpenFisica}
                sx={{
                  color: "white",
                  backgroundColor: "#1976D2",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#1976D2",
                  },
                }}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TablePersonasFisicas users={usersFisicos} />
          </Grid>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent={{ xs: "center", md: "flex-end" }}
            sx={{ mb: 2 }}
          >
            <Grid item>
              <Button
                variant="contained"
                onClick={handleClickOpenMoral}
                sx={{
                  color: "white",
                  backgroundColor: "#1976D2",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#1976D2",
                  },
                }}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TablePersonasMorales users={usersMorales} />
          </Grid>
        </CustomTabPanel>
      </Box>
      <AddPersonasFisicas
        modal={openModalFisica}
        handleCloseFisica={handleCloseFisica}
        users={usersFisicos}
      />
      <AddPersonasMorales
        modal={openModalMoral}
        handleCloseMoral={handleCloseMoral}
        users={usersMorales}
      />
    </Layout>
  );
}
