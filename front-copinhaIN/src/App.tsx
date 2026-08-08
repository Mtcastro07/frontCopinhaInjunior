import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./user/login";
import Dashboard from "./admin/pages/Dashboard";
import GruposGerenciar from "./admin/pages/GruposAdmin";
import NoticiasGerenciar from "./admin/pages/Noticias";
import Times from "./admin/pages/Times";
import EstadiosAdmin from "./admin/pages/Estadios";
import { JogosAdmin } from "./admin/pages/Jogos";
import Grupos from "./admin/pages/Grupos";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/GruposAdmin" element={<GruposGerenciar />} />
          <Route path="/NoticiasAdmin" element={<NoticiasGerenciar />} />
          <Route path="/TimesAdmin" element={<Times />} />
          <Route path="/EstadiosAdmin" element={<EstadiosAdmin />} />
          <Route path="/JogosAdmin" element={<JogosAdmin />} />
          <Route path="/Grupos" element={<Grupos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
