import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import Show from "./show/Show";
import Edite from "./edite/Edite";
import Details from "./details/Details";
import Create from "./create/Create";


export const enseignantRoutes = (
    <Route path="enseignant" element={<Layout />} >
        <Route index element={<Show />} />
        <Route path="edite/:id" element={<Edite />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="create" element={<Create />} />
    </Route>
)