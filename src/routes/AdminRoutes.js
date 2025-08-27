import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Inicio from "../containers/Inicio/Inicio";
import Cursos from "../containers/Cursos/Cursos";
import Instructores from "../containers/Instructores/Instructores";
import Usuarios from "../containers/Usuarios/Usuarios";
import Perfil from "../containers/Perfil/Perfil";
import Agenda from "../containers/Agenda/Agenda";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Inicio} />
      <Route exact path="/Usuarios" component={Usuarios} />
      <Route exact path="/Instructores" component={Instructores} />
      <Route exact path="/Cursos" component={Cursos} />
      <Route exact path="/Agenda" component={Agenda} />
      <Route exact path="/Perfil" component={Perfil} /> 
    </Switch>
  );
};

export default AdminRoutes;
