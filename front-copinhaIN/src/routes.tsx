import { Routes, Route } from "react-router-dom";
import Home from "./admin/pages/Home";
import Grupos from "./admin/pages/Grupos";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grupos" element={<Grupos />} />
    </Routes>
  );
}
