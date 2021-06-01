import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../provider/jobs/proyectoContext";
import AlertaContext from "../../provider/alerts/alertaContext";

const ListadoProyectos = () => {
  const { proyectos, mensaje, mostrarProyectos } = useContext(proyectoContext);
  const { alerta, mostrarAlerta } = useContext(AlertaContext);

  useEffect(() => {
    //Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    mostrarProyectos();
  }, [mensaje]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      {proyectos.length === 0 ? (
        <li className="mensaje">No tienes ningún proyecto</li>
      ) : (
        proyectos.map((proyecto) => (
          <Proyecto key={proyecto._id} proyecto={proyecto} />
        ))
      )}
    </ul>
  );
};

export default ListadoProyectos;
