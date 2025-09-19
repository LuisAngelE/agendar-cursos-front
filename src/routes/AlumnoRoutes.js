import React from "react";
import { Switch, Route } from "react-router-dom";
import Cursos from "../containers/Cursos/Cursos";
import Perfil from "../containers/Perfil/Perfil";
import Agenda from "../containers/Agenda/Agenda";
import VistaCursos from "../containers/Cursos/VistaCursos";
import VistaAgenda from "../containers/Agenda/VistaAgenda";
import NoResultados from "../components/layout/NoResultados";
import CursosFavoritos from "../containers/CursosFavoritos/CursosFavoritos";

const AlumnoRoutes = () => (
  <Switch>
    <Route exact path="/Cursos" component={Cursos} />
    <Route exact path="/Cursos/:id" component={VistaCursos} />
    <Route exact path="/Agenda" component={Agenda} />
    <Route exact path="/Agenda/:id" component={VistaAgenda} />
    <Route exact path="/Perfil" component={Perfil} />
    <Route exact path="/CursosFavoritos" component={CursosFavoritos} />
    <Route component={NoResultados} />
  </Switch>
);

export default AlumnoRoutes;
