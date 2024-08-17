import React, { useEffect } from "react";
import "./Details.css";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";
import Link from "../../../components/share/Link";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    get: getEnseignant,
    data: enseignant,
    loading: loadingEnseignant,
    error: EnseignantError
  } = useGet(`enseignant/${id}`);

  const { Delete: deleteEnseignant, disabledBtn: disabledDelete, error: errorDeleteEnseignant, loading: loadingDeleteEnseignant } = useDelete(`enseignant`, () => navigate("/enseignant"))

  useEffect(() => {
    getEnseignant();
  }, []);

  const handleDelete = (id) => {
    deleteEnseignant(id);
  };

  console.log(enseignant);

  if (EnseignantError) {
    return <div className="text-danger fs-1 mt-5 text-center">Error : {EnseignantError.message} : Enseignant</div>
  }

  return (
    <div className="details-enseignant-container">
      <div className="details-enseignant-contant">
        <div className="Header">
          <h1>Enseignant : {`${enseignant?.nom} ${enseignant?.prenom} `}</h1>
          <div className="d-flex gap-1">
            <Link
              className="btn btn-outline-warning"
              icon={<FiEdit2 />}
              to={`/enseignant/edite/${enseignant?.id}`}
            />
            <button className="btn btn-outline-danger " onClick={() => handleDelete(enseignant.id)} disabled={disabledDelete} >
              {loadingDeleteEnseignant ?
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                :
                <MdOutlineDelete />}
            </button>
          </div>
        </div>
        <div className="Body">
          {loadingEnseignant ?
            <>
              <div className="Row">
                <p>Nom</p>:
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <div className="Row">
                <p>Prénom</p>:
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <div className="Row">
                <p>Numéro téléphone </p>:
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <div className="Row">
                <p>Email</p>:
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light fs-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </>
            :
            <>
              <div className="Row">
                <p>Nom</p>:<span>{enseignant?.nom}</span>
              </div>
              <div className="Row">
                <p>Prénom</p>:<span>{enseignant?.prenom}</span>
              </div>
              <div className="Row">
                <p>Numéro téléphone </p>:<span>{enseignant?.tel ? enseignant?.tel : "-------"}</span>
              </div>
              <div className="Row">
                <p>Email</p>:<span>{enseignant?.email ? enseignant?.email : "-------"}</span>
              </div>
            </>}
        </div>
        {errorDeleteEnseignant && <div> Error : delete Enseignant </div>}
      </div>
    </div >
  );
}

export default Details;
