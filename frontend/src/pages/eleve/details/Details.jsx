import React, { useEffect } from "react";
import "./Details.css";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";
import Link from "../../../components/share/Link";
import { FiEdit2 } from "react-icons/fi";

function Details() {
  const { id } = useParams();
  const { get: getEleve, data: eleve, loading } = useGet(`eleve/${id}`);
  const navigate = useNavigate();

  const {
    Delete: deleteEleve,
    error,
    disabledBtn,
  } = useDelete(`eleve`, () => navigate("/eleve"));
  useEffect(() => {
    getEleve();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  const handleDelete = (id) => {
    deleteEleve(id);
  };
  return (
    <div className="details-eleve-container">
      <div className="details-eleve-contant">
        <div className="Header">
          <h1>Elève : {`${eleve?.nom} ${eleve?.prenom}`}</h1>
          <div className="d-flex gap-1">
            <Link
              className="btn btn-outline-warning"
              icon={<FiEdit2 />}
              to={`/eleve/edite/${eleve?.id}`}
            />
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(eleve.id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </div>
        <div className="Body">
          {loading ? (
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
                <p>Numéro téléphone de parent</p>:
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
                <p>Numéro téléphone de élève</p>:
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
                <p>Niveau de l'élève</p>:
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
                <p>Centre d'inscription</p>:
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
                <p>date de l'inscription</p>:
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
                <p>d'Inscription par</p>:
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
          ) : (
            <>
              <div className="Row">
                <p>Nom</p>:<span>{capitalizeFirstLetter(eleve?.nom)}</span>
              </div>
              <div className="Row">
                <p>Prénom</p>:<span>{capitalizeFirstLetter(eleve?.prenom)} </span>
              </div>
              <div className="Row">
                <p>Numéro téléphone de parent</p>:
                <span>{eleve?.tel_parent ? eleve?.tel_parent : "_______"}</span>
              </div>
              <div className="Row">
                <p>Numéro téléphone de élève</p>:
                <span>{eleve?.tel_eleve ? eleve?.tel_eleve : "_______"}</span>
              </div>
              <div className="Row">
                <p>Niveau de l'élève</p>:<span>{eleve?.Niveaux.nom}</span>
              </div>
              <div className="Row">
                <p>Centre d'inscription</p>:<span>{eleve?.Centre.nom}</span>
              </div>
              <div className="Row">
                <p>date de l'inscription</p>:
                <span>
                  {eleve?.date_inscription &&
                    new Date(eleve.date_inscription).toLocaleDateString(
                      "en-US",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                </span>
              </div>
              <div className="Row">
                <p>d'Inscription par</p>:<span>{eleve?.inscription_par}</span>
              </div>
              <div className="Row">
                <p>Matieres</p>:
                <ul>
                  {eleve?.Matieres.map((e) => (
                    <li key={e.id}>{e.nom}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
