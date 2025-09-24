import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicRouter } from "./PublicRouter";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { PrivateRouter } from "./PrivateRoute";
import AuthContext from "../context/Auth/AuthContext";
import { Grid } from "@mui/material";
import LoadingComponent from "../components/loading/LoadingComponent";
import ResetPassword from "../components/Auth/ResetPassword";

import AdminRoutes from "./AdminRoutes";
import InstructorRoutes from "./InstructorRoutes";
import AlumnoRoutes from "./AlumnoRoutes";

const AppRouter = () => {
  const { autenticado, usuarioAutenticado, cargando } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  if (cargando) {
    return (
      <Grid item xs={12}>
        <LoadingComponent />
      </Grid>
    );
  }

  const type_user = localStorage.getItem("type_user");

  let PrivateComponent = null;
  if (type_user === "1") PrivateComponent = AdminRoutes;
  if (type_user === "2") PrivateComponent = InstructorRoutes;
  if (type_user === "3") PrivateComponent = AlumnoRoutes;

  return (
    <Router>
      <Switch>
        <PublicRouter
          exact
          path="/"
          component={Login}
          isAuthenticated={autenticado}
        />
        <PublicRouter
          exact
          path="/registrarme"
          component={Register}
          isAuthenticated={autenticado}
        />
        <PublicRouter
          exact
          path="/olvidaste-tu-contraseña"
          component={ResetPassword}
          isAuthenticated={autenticado}
        />

        {PrivateComponent && (
          <PrivateRouter
            path="/"
            component={PrivateComponent}
            isAuthenticated={autenticado}
          />
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
