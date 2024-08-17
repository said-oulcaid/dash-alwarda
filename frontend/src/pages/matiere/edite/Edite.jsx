import React, { useEffect, useState } from "react";
import "./Edite.css";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import useUpdate from "../../../hooks/useUpdate";

function Edite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [disableEdite, setDisableEdite] = useState(true);

  const {
    get: getMatiere,
    data: matiere,
    loading: loadingMatiere,
    error: matiereError,
  } = useGet(`matiere/${id}`);
  const {
    get: getEnseignants,
    data: enseignants,
    loading: loadingEnseignants,
    error: enseignantsError,
  } = useGet("enseignants", []);
  const {
    get: getNiveaux,
    data: niveaux,
    loading: loadingNiveaux,
    error: niveauxError,
  } = useGet("niveaux", []);
  const {
    loading: loadingEditeMatiere,
    error: postError,
    update: updateMatiere,
    disabledBtn,
  } = useUpdate(`matiere/edite/${id}`, {});

  useEffect(() => {
    getMatiere();
    getEnseignants();
    getNiveaux();
  }, []);

  useEffect(() => {
    if (matiere) {
      setFormData({
        nom: matiere.nom,
        prix: matiere.prix,
        enseignantId: matiere.EnseignantId,
        niveauId: matiere.NiveauxId,
      });
    }
  }, [matiere]);

  console.log(matiere);

  const checkDisableEdite = () => {
    const { nom, prix, enseignantId, niveauId } = formData;
    const isFormValid =
      (nom && nom.trim() !== matiere?.nom) ||
      (prix !== undefined && prix !== matiere?.prix) ||
      (enseignantId && parseInt(enseignantId) !== matiere?.EnseignantId) ||
      (niveauId && parseInt(niveauId) !== matiere?.NiveauxId);
    setDisableEdite(!isFormValid);
  };

  useEffect(() => {
    checkDisableEdite();
  }, [formData, matiere]);

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;
    setFormData({ ...formData, [field]: value });
    checkDisableEdite();
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!disableEdite) {
      updateMatiere(formData, () => navigate(-1));
    }
  };

  if(loadingMatiere){
    return <div className="edite-matiere-container">
    <div className="edite-matiere-contant">
      <span className="text-danger fs-4">Chargement Edite Matiere ...</span>
    </div>
  </div>
  }

  return (
    <div className="edite-matiere-container">
      <div className="edite-matiere-contant">
        <h1>
          Modifier :
          <span className="text-white fs-5"> {matiere?.nom}</span>
        </h1>
        <form onSubmit={handelSubmit}>
          <div className="double-input">
            <div className="group-input">
              <label>
                Nom : <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="nom"
                defaultValue={matiere?.nom}
                onChange={handleChange}
              />
            </div>
            <div className="group-input">
              <label>
                Prix : <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="prix"
                defaultValue={matiere?.prix}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="double-input">
            <div className="group-input">
              <label>
                Enseignant : <span className="text-danger">*</span>
              </label>
              <select id="enseignantId" onChange={handleChange}>
                {loadingEnseignants ? (
                  <option value="">Loading...</option>
                ) : (
                  <option value={matiere?.EnseignantId}>
                    {matiere?.Enseignant?.nom}
                  </option>
                )}
                {enseignants
                  .filter((e) => matiere.EnseignantId !== e.id)
                  .map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.nom}
                    </option>
                  ))}
              </select>
            </div>
            <div className="group-input">
              <label>
                Niveau : <span className="text-danger">*</span>
              </label>
              <select id="niveauId" onChange={handleChange}>
                {loadingNiveaux ? (
                  <option value="">Loading...</option>
                ) : (
                  <option value={matiere?.NiveauxId}>
                    {matiere?.Niveaux?.nom}
                  </option>
                )}
                {niveaux
                  .filter((n) => matiere.NiveauxId !== n.id)
                  .map((n) => (
                    <option value={n.id} key={n.id}>
                      {n.nom}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className={`${disabledBtn && "btn disabled"} ${
              disableEdite ? "disabled-button" : "open-button"
            }`}
          >
            {loadingEditeMatiere ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Modifier"
            )}
          </button>
          <div className="text-center text-danger mt-4">
            {postError && <p>{postError} </p>}
            {matiereError && <p>Error: {matiereError.message} matière</p>}
            {enseignantsError && (
              <p>Error: {enseignantsError.message} enseignants</p>
            )}
            {niveauxError && <p>Error: {niveauxError.message} niveaux</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edite;
