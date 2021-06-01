import React, { useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../provider/alerts/alertaContext";
import AuthContext from "../../provider/auth/authContext";

const NuevaCuenta = ({ history }) => {
  //Extraer los valores del context
  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  const { registrarUsuario, mensaje, autenticado } = useContext(AuthContext);
  //Referencia al E-mail
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refConfirmar = useRef(null);
  const refName = useRef(null);
  //En caso de que el usuario se haya autenticado, registrado o sea duplicado
  useEffect(() => {
    if (autenticado) {
      history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, history]);
  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    //Validar que no haya campos vacios
    if (
      refEmail.current.value.trim() === "" ||
      refPassword.current.value.trim() === "" ||
      refConfirmar.current.value.trim() === "" ||
      refName.current.value.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //Password minimo 6 caracteres
    if (refPassword.current.value.length < 6) {
      mostrarAlerta("Password debe tener mínimo 6 caractéres", "alerta-error");
      return;
    }

    //Los dos passwords sean iguales
    if (refPassword.current.value !== refConfirmar.current.value) {
      mostrarAlerta("Password debe ser igual en ambos campos", "alerta-error");
      return;
    }
    //Pasar los datos al action
    registrarUsuario({
      nombre: refName.current.value.trim(),
      email: refEmail.current.value.trim(),
      password: refPassword.current.value.trim(),
    });
  };

  return (
    <>
      <div className="form-usuario">
        {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        <div className="contenedor-form sombra-dark">
          <h1>Crear una Cuenta</h1>

          <form onSubmit={onSubmit}>
            {/* NOMBRE */}
            <div className="campo-form">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Introduce tu nombre..."
                ref={refName}
              ></input>
            </div>
            {/* EMAIL */}
            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Introduce tu email..."
                ref={refEmail}
              ></input>
            </div>
            {/* PASSWORD */}
            <div className="campo-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Introduce tu password..."
                autoComplete="new password"
                ref={refPassword}
              ></input>
            </div>
            {/* REPETIR PASSWORD */}
            <div className="campo-form">
              <label htmlFor="confirmar">Confirmar Password</label>
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                placeholder="Repite tu password..."
                autoComplete="new password"
                ref={refConfirmar}
              ></input>
            </div>
            {/* BOTON */}
            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Crear Cuenta"
              />
            </div>
          </form>
          <Link to={"/"} className="enlace-cuenta">
            ¿Ya tienes una Cuenta?
          </Link>
        </div>
      </div>
    </>
  );
};

export default NuevaCuenta;
