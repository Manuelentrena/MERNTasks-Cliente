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

const TareaReducer = (state, action) => {
  switch (action.type) {
    case MOSTRAR_TAREAS:
      return {
        ...state,
        tareas_proyecto: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareas_proyecto: [action.payload, ...state.tareas_proyecto],
      };
    case MOSTRAR_ERROR_FORMULARIO_TAREA:
      return { ...state, error: true };
    case OCULTAR_ERROR_FORMULARIO_TAREA:
      return { ...state, error: false };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas_proyecto: state.tareas_proyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case TAREA_ACTUAL:
      return { ...state, tarea_open: action.payload };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareas_proyecto: state.tareas_proyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
      };
    case LIMPIAR_TAREAS:
      return {
        tareas_proyecto: [],
        error: false,
        tarea_open: {},
      };
    default:
      return state;
  }
};

export default TareaReducer;
