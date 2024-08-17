import { Route } from "react-router-dom";
import Show from "./show/Show";
import Layout from "../../layout/Layout";
import Edite from "./edite/Edite";
import Details from "./details/Details";
import Create from "./create/Create";


export const matiereRoutes = (
    <Route path="matiere" element={<Layout />} >
        <Route index element={<Show />} />
        <Route path="edite/:id" element={<Edite />} />
        <Route path="details/:id/eleves" element={<Details />} />
        <Route path="create" element={<Create />} />
    </Route>
)