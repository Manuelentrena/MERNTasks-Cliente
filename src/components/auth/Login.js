import React, { useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../provider/alerts/alertaContext";
import AuthContext from "../../provider/auth/authContext";

const Login = ({ history }) => {
  //Extraer los valores del context
  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  const { iniciarSesion, mensaje, autenticado } = useContext(AuthContext);
  //Referencia al E-mail
  const refEmail = useRef(null);
  const refPassword = useRef(null);

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
      refPassword.current.value.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //Pasar los datos al action
    iniciarSesion({
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
          <h1>Iniciar Sesión</h1>

          <form onSubmit={onSubmit}>
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
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Introduce tu password..."
                autoComplete="new password"
                ref={refPassword}
              ></input>
            </div>
            {/* BOTON */}
            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Iniciar Sesión"
              />
            </div>
          </form>
          <Link to={"/nueva-cuenta"} className="enlace-cuenta">
            Obtener Cuenta
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
