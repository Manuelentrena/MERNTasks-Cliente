import React, { useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../provider/jobs/proyectoContext";
import TareaContext from "../../provider/tasks/tareaContext";

const ListadoTareas = () => {
  //Leer el State global de Proyectos
  const { proyecto_open, eliminarProyecto } = useContext(proyectoContext);
  //Leer el State global de Tareas
  const { tareas_proyecto } = useContext(TareaContext);

  //Estraemos proyecto activo de proyecto_open
  if (!proyecto_open) {
    return <h2>Selecciona un proyecto</h2>;
  }

  const { nombre, _id } = proyecto_open?.[0];

  return (
    <>
      <h2>Proyecto: {nombre}</h2>
      <ul className="listado-tareas">
        {tareas_proyecto.length === 0 ? (
          <li className="tarea">
            <p>No Hay Tareas</p>
          </li>
        ) : (
          tareas_proyecto.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        )}
        <button
          type="button"
          className="btn btn-eliminar"
          onClick={() => {
            eliminarProyecto(_id);
          }}
        >
          Eliminar Proyecto &times;
        </button>
      </ul>
    </>
  );
};

export default ListadoTareas;
