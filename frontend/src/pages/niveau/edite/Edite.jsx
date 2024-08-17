import React, { useEffect, useState } from "react";
import "./Edite.css";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import useUpdate from "../../../hooks/useUpdate";

function EditeNiveau() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: ''
  });
  const [disableEdite, setDisableEdite] = useState(true);

  const {
    get: getNiveau,
    data: niveau,
    loading: loadingNiveau,
    error: getNiveauError,
  } = useGet(`niveau/${id}`);

  const {
    loading: loadingEditeNiveau,
    error: editeNiveauError,
    update: updateNiveau,
    disabledBtn: disableBtnEditeNiveau,
  } = useUpdate(`niveau/edite/${id}`, {});

  useEffect(() => {
    getNiveau();
  }, []);

  useEffect(() => {
    if (niveau) {
      setFormData({
        nom: niveau.nom,
      });
    }
  }, [niveau]);

  const checkDisableEdite = () => {
    const { nom } = formData;
    const isFormValid = nom && nom.trim() !== niveau?.nom;
    setDisableEdite(!isFormValid);
  };

  useEffect(() => {
    checkDisableEdite();
  }, [formData, niveau]);

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;
    setFormData({ ...formData, [field]: value.trim() });
    checkDisableEdite();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disableEdite) {
      updateNiveau(formData, () => navigate(-1));
    }
  };

  if (loadingNiveau) {
    return <div className="edite-niveau-container">
      <div className="edite-niveau-contant">
        <span className="text-danger fs-4">Chargement Edite niveau ...</span>
      </div>
    </div>
  }

  return (
    <div className="edite-niveau-container">
      <div className="edite-niveau-contant">
        <h1>
          Modifier Niveau : <span className="text-white fs-5">{niveau?.nom}</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="group-input">
            <label htmlFor="">
              Nom  <span className="text-danger">*</span> :
            </label>
            <input
              type="text"
              id="nom"
              defaultValue={niveau?.nom}
              onChange={handleChange}
            />
          </div>
          {editeNiveauError && <div className="mt-2 text-danger ">{editeNiveauError}</div>}
          <button
            type="submit"
            className={`${disableBtnEditeNiveau && "btn disabled"} ${disableEdite ? "disabled-button" : "open-button"}`}
          >
            {loadingEditeNiveau ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Modifier"
            )}
          </button>
          <div className="text-center text-danger mt-4">
            {getNiveauError && <p>Error: {getNiveauError.message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditeNiveau;
