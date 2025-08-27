// Importamos las dependencias necesarias de React, React Router, y Material-UI
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicRouter } from "./PublicRouter";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AdminRoutes from "./AdminRoutes";
import { PrivateRouter } from "./PrivateRoute";
import AuthContext from "../context/Auth/AuthContext";
import { Grid } from "@mui/material";
import LoadingComponent from "../components/loading/LoadingComponent";

const AppRouter = () => {
  const { autenticado, usuarioAutenticado, cargando } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  if (cargando) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <LoadingComponent />
      </Grid>
    );
  }

  return (
    <>
      <Router>
        <Switch>
          <PublicRouter
            exact
            path="/iniciar-sesion"
            component={Login}
            // isAuthenticated={autenticado}
          />
          <PublicRouter
            exact
            path="/registrarme"
            component={Register}
            // isAuthenticated={autenticado}
          />
          <PrivateRouter
            path="/"
            component={AdminRoutes}
            // isAuthenticated={autenticado}
          />
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
