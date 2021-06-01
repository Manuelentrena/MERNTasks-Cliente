import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import {
  MOSTRAR_TAREAS,
  AGREGAR_TAREA,
  MOSTRAR_ERROR_FORMULARIO_TAREA,
  OCULTAR_ERROR_FORMULARIO_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREAS,
} from "../../events";

import clienteAxios from "../../config/axios";

const TareaState = (props) => {
  //Estado inicial
  const initialState = {
    tareas_proyecto: [],
    error: false,
    tarea_open: {},
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Mostrar Tareas
  const mostrarTareas = async (proyecto) => {
    try {
      const respuesta = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      dispatch({
        type: MOSTRAR_TAREAS,
        payload: respuesta.data.tareas,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  //Agregar Tarea
  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: resultado.data.tareaNueva,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  //Mostrar error form
  const mostrarError = () => {
    dispatch({
      type: MOSTRAR_ERROR_FORMULARIO_TAREA,
    });
  };

  //ocultar error form
  const ocultarError = () => {
    dispatch({
      type: OCULTAR_ERROR_FORMULARIO_TAREA,
    });
  };

  //Eliminar tarea por id
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {
        params: { proyecto },
      });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  //Actualizar tarea
  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tareaActualizada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Extrae una tarea para editar
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const limpiarTareas = () => {
    dispatch({
      type: LIMPIAR_TAREAS,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareas_proyecto: state.tareas_proyecto,
        error: state.error,
        tarea_open: state.tarea_open,
        mostrarTareas,
        agregarTarea,
        mostrarError,
        ocultarError,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTareas,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
