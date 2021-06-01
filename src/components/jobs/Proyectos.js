import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tasks/FormTarea";
import ListadoTareas from "../tasks/ListadoTareas";
import AuthContext from "../../provider/auth/authContext";

const Proyectos = () => {
  //Extraer la informacion de autenticacion
  const { usuarioAutenticado } = useContext(AuthContext);

  //Cuando cambie
  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
