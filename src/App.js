import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/jobs/Proyectos";

import ProyectoState from "./provider/jobs/proyectoState";
import TareaState from "./provider/tasks/tareaState";
import AlertaState from "./provider/alerts/alertaState";
import AuthState from "./provider/auth/authState";
import tokenAuth from "./config/token";
import RutaPrivada from "./components/rutas/rutaPrivada";

//revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
