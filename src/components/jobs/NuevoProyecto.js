import React, { useRef, useContext } from "react";
import proyectoContext from "../../provider/jobs/proyectoContext";

const NuevoProyecto = () => {
  //Leer el State global de Proyectos
  const {
    formulario,
    error,
    nuevoProyecto,
    mostrarError,
    quitarError,
    toggleFormulario,
  } = useContext(proyectoContext);

  // Referencias del form
  const refProyecto = useRef();

  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar el campo
    if (refProyecto.current.value === "") {
      if (!error) {
        mostrarError();
        setTimeout(() => {
          quitarError();
        }, 2500);
      }
      return null;
    }
    quitarError();
    nuevoProyecto({ nombre: refProyecto.current.value });
    //Reinicar el form
    refProyecto.current.value = "";
  };

  return (
    <>
      {/* BOTON OCULTAR/MOSTRAR */}
      <button
        type="button"
        className="btn btn-primario btn-circulo"
        onClick={toggleFormulario}
      >
        {formulario ? "▲" : "▼"}
      </button>
      <div
        className={` ${"view-dinamic-form"} ${
          formulario ? "view-visible" : "view-ocult"
        }`}
      >
        <form
          onSubmit={onSubmit}
          /* className="formulario-nuevo-proyecto" */
          className={`${"formulario-nuevo-proyecto mover-form"} ${
            formulario ? null : "toggle-form"
          }`}
        >
          {/* NOMBRE */}
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del Proyecto..."
            name="nombre"
            ref={refProyecto}
          />
          {/* BOTON */}
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      </div>
      {error ? <p className="mensaje error">"Campo Obligatorio"</p> : null}
    </>
  );
};

export default NuevoProyecto;
