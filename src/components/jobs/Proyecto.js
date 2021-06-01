import React, { useContext } from "react";
import proyectoContext from "../../provider/jobs/proyectoContext";
import TareaContext from "../../provider/tasks/tareaContext";

const Proyecto = ({ proyecto }) => {
  const { proyectoActual } = useContext(proyectoContext);
  const { mostrarTareas, guardarTareaActual } = useContext(TareaContext);

  //Al hacer click en el proyecto
  const seleccionarProyecto = (id) => {
    proyectoActual(id);
    mostrarTareas(id);
  };

  return (
    <li onClick={() => guardarTareaActual({})}>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
