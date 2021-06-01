import React, { useContext, useEffect } from "react";
import AuthContext from "../../provider/auth/authContext";
import TareaContext from "../../provider/tasks/tareaContext";
import proyectoContext from "../../provider/jobs/proyectoContext";

const Barra = () => {
  //Extraer la informacion de autenticacion
  const { usuarioAutenticado, cerrarSesion, usuario } = useContext(AuthContext);
  const { limpiarTareas } = useContext(TareaContext);
  const { limpiarProyectos } = useContext(proyectoContext);
  //Cuando cambie
  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);
  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          className="btn"
          onClick={() => {
            cerrarSesion();
            limpiarTareas();
            limpiarProyectos();
          }}
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default Barra;
