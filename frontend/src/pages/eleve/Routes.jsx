import { Navigate, Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import { CreateEleve, DetailsEleve, EditeEleve, ShowEleve } from ".";

export const eleveRoutes = (
  <Route path="eleve" element={<Layout />}>
    <Route index element={<ShowEleve />} />
    <Route path="create" element={<CreateEleve />} />
    <Route path="edite/:id" element={<EditeEleve />} />
    <Route path="details/:id" element={<DetailsEleve />} />
    <Route path="*" element={<Navigate to={-1} />} />
  </Route>
);
