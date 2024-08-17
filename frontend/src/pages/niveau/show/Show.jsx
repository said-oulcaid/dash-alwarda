import React, { useEffect } from "react";
import './Show.css';
import { IoEyeOutline } from "react-icons/io5";
import Link from "../../../components/share/Link";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";

function Show() {
  const {
    get: getNiveaux,
    data: niveaux,
    loading: loadingNiveaux,
    error: getNiveauxError,
  } = useGet("niveaux", []);
  const {
    Delete: deleteNiveau,
    error: deleteNiveauError,
    disabledBtn: deleteDisableBtn,
  } = useDelete(`niveau`, getNiveaux);

  useEffect(() => {
    getNiveaux();
  }, []);

  const handleDelete = (id) => {
    deleteNiveau(id);
  };

  if (getNiveauxError) {
    return <h1 className="text-center text-danger mt-5">Error: {getNiveauxError?.message} niveaux</h1>;
  }

  return (
    <div className="niveau-container">
      <div className="niveau-titel">
        <h1>Liste de Niveaux</h1>
        <Link
          className="btn btn-outline-primary"
          text="nouvelle niveau"
          to="create"
        />
      </div>
      {!niveaux.length && !loadingNiveaux && (
        <div>
          <h1 className="text-danger text-center">Il n'y a pas de niveau, ajoutez-le</h1>
        </div>
      )}
      <div className="niveau-contant">
        {loadingNiveaux ? (
          <div className="spinner-grow text-light" role="status">
            Chargement du niveau...
          </div>
        ) : (
          niveaux.map((n, index) => (
            <div className="niveau-carte" key={index}>
              <div className="d-flex justify-content-end align-items-center mb-1">
                <Link
                  className="btn btn-outline-light button"
                  icon={<IoEyeOutline />}
                  to={`details/${n.id}/eleves`}
                />
                <Link
                  className="btn btn-outline-warning"
                  icon={<FiEdit2 />}
                  to={`edite/${n.id}`}
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(n.id)}
                  disabled={deleteDisableBtn}
                >
                  <MdOutlineDelete />
                </button>
              </div>
              <h1>{n.nom}</h1>
              <div className="Row">
                <p>Elèves</p>:<span>{n.totalEleves}</span>
              </div>
            </div>
          ))
        )}
      </div>
      {deleteNiveauError && <p className="text-danger mt-3">Error: {deleteNiveauError.message} Delete Niveau</p>}
    </div>
  );
}

export default Show;
