import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import Create from "./create/Create";
import Edite from "./Edite/Edite";
import Details from "./details/Details";
import Show from "./Show/Show";

export const centreRoutes = (
    <Route path="centre" element={<Layout />} >
        <Route index  element={<Show />} />
        <Route path="create"  element={<Create />} />
        <Route path="edite/:id"  element={<Edite />} />
        <Route path="details/:id/eleves"  element={<Details />} />
    </Route>
)