import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import AuthContext from "../../context/Auth/AuthContext";

const Perfil = () => {
  const { user_me, UserMe } = useContext(AuthContext);

  useEffect(() => {
    if (user_me === null) {
      UserMe();
    }
  }, []);

  const [saludo, setSaludo] = useState("");
  useEffect(() => {
    const obtenerSaludo = () => {
      const horaActual = new Date().getHours();

      if (horaActual >= 6 && horaActual < 12) {
        setSaludo("Buenos Dias");
      } else if (horaActual >= 12 && horaActual < 18) {
        setSaludo("Buenas Tardes");
      } else {
        setSaludo("Buenas Noches");
      }
    };
    obtenerSaludo();
  }, []);
  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {user_me ? (
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Typography
              fontWeight="bold"
              fontFamily="monospace"
              variant="h5"
              sx={{ color: "black" }}
            >
              Hola {saludo}, {user_me.name} {user_me.last_name}{" "}
              {user_me.razon_social}
            </Typography>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Layout>
  );
};

export default Perfil;
