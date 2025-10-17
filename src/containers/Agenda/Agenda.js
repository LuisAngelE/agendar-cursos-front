import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
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
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    GetAgendas();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant={isMobile ? "fullWidth" : "scrollable"}
              scrollButtons="auto"
              aria-label="agenda tabs"
            >
              <Tab label="Pendientes de Confirmación" {...a11yProps(0)} />
              <Tab label="Confirmadas" {...a11yProps(1)} />
              <Tab label="Canceladas" {...a11yProps(2)} />
              <Tab label="Realizadas" {...a11yProps(3)} />
            </Tabs>
          </Box>

          {[1, 2, 3, 4].map((status, index) => (
            <CustomTabPanel key={index} value={value} index={index}>
              <Box sx={{ overflowX: "auto" }}>
                <TableAgenda
                  agendas={agendas.filter(
                    (a) => a.reservations?.[0]?.status === status
                  )}
                />
              </Box>
            </CustomTabPanel>
          ))}
        </Box>
      </Grid>
    </Layout>
  );
};

export default Agenda;
