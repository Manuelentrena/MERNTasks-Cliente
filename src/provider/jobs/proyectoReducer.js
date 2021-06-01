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

const proyectoReducer = (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return { ...state, formulario: !state.formulario };
    case MOSTRAR_PROYECTOS:
      return { ...state, proyectos: action.payload.proyectos };
    case NUEVO_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        formulario: false,
      };
    case MOSTRAR_ERROR_FORMULARIO_PROYECTO:
      return { ...state, error: true };
    case OCULTAR_ERROR_FORMULARIO_PROYECTO:
      return { ...state, error: false };
    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyecto_open: state.proyectos.filter(
          (proyecto) => proyecto._id === action.payload
        ),
      };
    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto._id !== action.payload
        ),
        proyecto_open: null,
      };
    case PROYECTO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_PROYECTOS:
      return {
        proyectos: [],
        formulario: false,
        error: false,
        proyecto_open: null,
        mensaje: null,
      };
    default:
      return state;
  }
};

export default proyectoReducer;
