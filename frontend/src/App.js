import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { eleveRoutes } from "./pages/eleve/Routes";
import { loginRoutes } from "./pages/auth/Routes";
import { homeRoutes } from "./pages/home/routes";
import { enseignantRoutes } from "./pages/enseignant/Routes";
import { matiereRoutes } from "./pages/matiere/Routes";
import { centreRoutes } from "./pages/centre/Routes";
import { niveuaRoutes } from "./pages/niveau/Routes";
import { paiementRoutes } from "./pages/paiement/Routes";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/login" element={<Navigate to="/" />} />
          {homeRoutes}
          {eleveRoutes}
          {enseignantRoutes}
          {matiereRoutes}
          {centreRoutes}
          {niveuaRoutes}
          {paiementRoutes}
        </>
      ) : (
        <>
          {loginRoutes}
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
