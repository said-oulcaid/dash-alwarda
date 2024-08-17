import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import Create from "./create/Create";
import Edite from "./edite/Edite";
import Details from "./details/Details";
import Show from "./show/Show";

export const niveuaRoutes =(
    <Route path="niveau" element={<Layout />} >
        <Route index element={<Show />} />
        <Route path="create" element={<Create />} />
        <Route path="edite/:id" element={<Edite />} />
        <Route path="details/:id/eleves" element={<Details />} />
    </Route>
)