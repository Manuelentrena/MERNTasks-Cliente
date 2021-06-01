import React, { useContext, useRef, useEffect } from "react";
import proyectoContext from "../../provider/jobs/proyectoContext";
import TareaContext from "../../provider/tasks/tareaContext";

const FormTarea = () => {
  //Leer el State global de Proyectos
  const { proyecto_open } = useContext(proyectoContext);

  //Leer el State global de Tareas
  const {
    tarea_open,
    error,
    agregarTarea,
    mostrarError,
    ocultarError,
    actualizarTarea,
    guardarTareaActual,
  } = useContext(TareaContext);

  //Referencia al nombre de Tarea
  const refNombre = useRef(null);

  //DeSpues del DOM para tarea_open
  useEffect(() => {
    if (Object.keys(tarea_open).length !== 0) {
      refNombre.current.value = tarea_open.nombre;
    } else {
      if (refNombre.current !== null) {
        refNombre.current.value = "";
      }
    }
  }, [tarea_open]);

  //Extraemos proyecto activo de proyecto_open
  if (!proyecto_open) {
    return null;
  }

  //Agregar Tarea
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (refNombre.current.value.trim() === "") {
      mostrarError();
      setTimeout(() => {
        ocultarError();
      }, 2500);
      return;
    }
    ocultarError();
    //Agregar la tarea o editarla
    if (Object.keys(tarea_open).length === 0) {
      //Agregar
      agregarTarea({
        nombre: refNombre.current.value,
        proyecto: proyecto_open[0]._id,
      });
    } else {
      tarea_open.nombre = refNombre.current.value;
      actualizarTarea(tarea_open);
      guardarTareaActual({});
    }
    //Reiniciar el form
    refNombre.current.value = "";
  };

  return (
    /* FORMULARIO */
    <div className="formulario">
      <form onSubmit={onSubmit}>
        {/* NOMBRE */}
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            ref={refNombre}
          />
        </div>
        {/* BOTON */}
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-block btn-submit"
            value={
              Object.keys(tarea_open).length !== 0
                ? "Editar Tarea"
                : "Agregar tarea"
            }
          />
        </div>
      </form>
      {error ? <h2 className="mensaje error">Campo Obligatorio</h2> : null}
    </div>
  );
};

export default FormTarea;
