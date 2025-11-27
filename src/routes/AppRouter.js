import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
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
import SubAdminRouter from "./SubAdminRouter";
import CursosPublicos from "../containers/CursosPublicos/CursosPublicos";

const AppRouter = () => {
  const { autenticado, usuarioAutenticado, cargando, loginExterno, errorAuth } =
    useContext(AuthContext);

  const location = window.location;
  const params = new URLSearchParams(location.search);
  const collaborator_number = params.get("collaborator_number");

  useEffect(() => {
    if (collaborator_number) {
      loginExterno(collaborator_number);
    } else {
      usuarioAutenticado();
    }
  }, []);

  if (cargando) {
    return (
      <Grid item xs={12}>
        <LoadingComponent />
      </Grid>
    );
  }

  if (!autenticado && errorAuth && collaborator_number) {
    return <Redirect to="/" />;
  }

  const type_user = localStorage.getItem("type_user");

  let PrivateComponent = null;
  if (type_user === "1") PrivateComponent = AdminRoutes;
  if (type_user === "2") PrivateComponent = InstructorRoutes;
  if (type_user === "3") PrivateComponent = AlumnoRoutes;
  if (type_user === "6") PrivateComponent = SubAdminRouter;

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
        <PublicRouter
          exact
          path="/cursos-publicos"
          component={CursosPublicos}
        />
        {autenticado && PrivateComponent && (
          <Redirect exact from="/" to="/Perfil" />
        )}
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
