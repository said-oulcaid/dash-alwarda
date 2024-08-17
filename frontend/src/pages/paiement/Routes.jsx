import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import Show from "./show/Show";

export const paiementRoutes = (
    <Route path="paiement" element={<Layout />} >
        <Route index element={<Show />} />
        <Route path="/paiement/enseignant" element={<Show />} />
        <Route path="/paiement/eleve" element={<Show />} />
    </Route>
)