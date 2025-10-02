import React, { useReducer } from "react";
import GraficasContext from "./GraficasContext";
import GraficasReducer from "./GraficasReducer";
import MethodGet from "../../config/service";
import {
  GET_COUNT_CATEGORIAS,
  GET_COUNT_COURSE,
  GET_COUNT_RESERVATION,
  GET_COUNT_USER,
} from "../../types";
const GraficasState = ({ children }) => {
  const initialState = {
    total_categories: [],
    total_course: [],
    total_reservartion: [],
    total_users: [],
    ErrorsApi: [],
  };
  const [state, dispatch] = useReducer(GraficasReducer, initialState);

  const CountCategories = () => {
    MethodGet("/countCategories")
      .then((res) => {
        dispatch({
          type: GET_COUNT_CATEGORIAS,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const CountCourse = () => {
    MethodGet("/countCourse")
      .then((res) => {
        dispatch({
          type: GET_COUNT_COURSE,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const CountReservation = () => {
    MethodGet("/countReservation")
      .then((res) => {
        dispatch({
          type: GET_COUNT_RESERVATION,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const CountUser = () => {
    MethodGet("/countUser")
      .then((res) => {
        dispatch({
          type: GET_COUNT_USER,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <GraficasContext.Provider
      value={{
        total_categories: state.total_categories,
        total_course: state.total_course,
        total_reservartion: state.total_reservartion,
        total_users: state.total_users,
        CountCategories,
        CountCourse,
        CountReservation,
        CountUser,
      }}
    >
      {children}
    </GraficasContext.Provider>
  );
};

export default GraficasState;
