import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import Layout from "../../components/layout/Layout";
import PropTypes from "prop-types";
import AgendaContext from "../../context/Agenda/AgendaContext";
import TableAgenda from "../../components/Tables/TableAgenda";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

const Agenda = () => {
  const { agendas, GetAgendas } = useContext(AgendaContext);

  let type_user = localStorage.getItem("type_user");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    GetAgendas();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="agenda tabs"
            >
              <Tab label="Pendiente de Confirmación" {...a11yProps(0)} />
              <Tab label="Reservación Confirmada" {...a11yProps(1)} />
              <Tab label="Reservación Cancelada" {...a11yProps(2)} />
              <Tab label="Reservación Realizada" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <TableAgenda
              agendas={agendas.filter((a) => a.reservations?.[0]?.status === 1)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TableAgenda
              agendas={agendas.filter((a) => a.reservations?.[0]?.status === 2)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <TableAgenda
              agendas={agendas.filter((a) => a.reservations?.[0]?.status === 3)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <TableAgenda
              agendas={agendas.filter((a) => a.reservations?.[0]?.status === 4)}
            />
          </CustomTabPanel>
        </Box>
      </Grid>
    </Layout>
  );
};

export default Agenda;
