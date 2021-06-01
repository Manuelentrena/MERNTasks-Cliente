import React from "react";
import NuevoProyecto from "../jobs/NuevoProyecto";
import ListadoProyectos from "../jobs/ListadoProyectos";

const Sidebar = () => {
  return (
    <aside>
      {/* TITULO */}
      <h1>
        MERN<span>Tasks</span>
      </h1>
      {/* FORM NUEVO PROYECTO */}
      <NuevoProyecto />
      {/* LIST TUS PROYECTOS */}
      <div className="proyectos">
        <h2>Tus Proyectos</h2>
        <ListadoProyectos />
      </div>
    </aside>
  );
};

export default Sidebar;
