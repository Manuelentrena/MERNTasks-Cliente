import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  MOSTRAR_PROYECTOS,
  NUEVO_PROYECTO,
  PROYECTO_ERROR,
  MOSTRAR_ERROR_FORMULARIO_PROYECTO,
  OCULTAR_ERROR_FORMULARIO_PROYECTO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  LIMPIAR_PROYECTOS,
} from "../../events";

import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
  //Estado inicial
  const initialState = {
    proyectos: [],
    formulario: false,
    error: false,
    proyecto_open: null,
    mensaje: null,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //Serie de funciones para el CRUD
  const toggleFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //Leer proyectos
  const mostrarProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");
      dispatch({
        type: MOSTRAR_PROYECTOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: PROYECTO_ERROR,
        payload: {
          msg: "Hubo un error",
          categoria: "alerta-error",
        },
      });
    }
  };

  //Nuevo Proyecto
  const nuevoProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      dispatch({
        type: NUEVO_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: PROYECTO_ERROR,
        payload: {
          msg: "Hubo un error",
          categoria: "alerta-error",
        },
      });
    }
  };

  //Mostrar errores del form
  const mostrarError = () => {
    dispatch({
      type: MOSTRAR_ERROR_FORMULARIO_PROYECTO,
    });
  };

  //Mostrar errores del form
  const quitarError = () => {
    dispatch({
      type: OCULTAR_ERROR_FORMULARIO_PROYECTO,
    });
  };

  //Selecciona el proyecto que el usuario dio click
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  //Eliminar un proyecto
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      dispatch({
        type: PROYECTO_ERROR,
        payload: {
          msg: "Hubo un error",
          categoria: "alerta-error",
        },
      });
    }
  };

  //Limpiar proyectos
  const limpiarProyectos = () => {
    dispatch({
      type: LIMPIAR_PROYECTOS,
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        error: state.error,
        proyecto_open: state.proyecto_open,
        mensaje: state.mensaje,
        toggleFormulario,
        mostrarProyectos,
        nuevoProyecto,
        mostrarError,
        quitarError,
        proyectoActual,
        eliminarProyecto,
        limpiarProyectos,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
