import React, { useContext } from "react";
import TareaContext from "../../provider/tasks/tareaContext";

const Tarea = ({ tarea }) => {
  //Leer el State global de Tareas
  const { eliminarTarea, actualizarTarea, guardarTareaActual } =
    useContext(TareaContext);

  //editar tarea
  /* const editarTarea = (tarea) => {
    guardarTareaActual(tarea);
  }; */

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => {
              guardarTareaActual({});
              actualizarTarea({ ...tarea, estado: false });
            }}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => {
              guardarTareaActual({});
              actualizarTarea({ ...tarea, estado: true });
            }}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => guardarTareaActual(tarea)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => {
            guardarTareaActual({});
            eliminarTarea(tarea._id, tarea.proyecto);
          }}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
