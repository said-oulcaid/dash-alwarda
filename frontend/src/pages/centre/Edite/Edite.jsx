import React, { useEffect, useState } from "react";
import "./Edite.css";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import useUpdate from "../../../hooks/useUpdate";

function EditeCentre() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: ''
  });
  const [disableEdite, setDisableEdite] = useState(true);

  const {
    get: getCentre,
    data: centre,
    loading: loadingCentre,
    error: getCentreError,
  } = useGet(`centre/${id}`);

  const {
    loading: loadingEditeCentre,
    error: editeCentreError,
    update: updateCentre,
    disabledBtn: disableBtnEditeCentre,
  } = useUpdate(`centre/edite/${id}`, {});

  useEffect(() => {
    getCentre();
  }, []);

  useEffect(() => {
    if (centre) {
      setFormData({
        nom: centre.nom,
      });
    }
  }, [centre]);

  const checkDisableEdite = () => {
    const { nom } = formData;
    const isFormValid = nom && nom.trim() !== centre?.nom;
    setDisableEdite(!isFormValid);
  };

  useEffect(() => {
    checkDisableEdite();
  }, [formData, centre]);

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;
    setFormData({ ...formData, [field]: value.trim() });
    checkDisableEdite();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disableEdite) {
      updateCentre(formData, () => navigate(-1));
    }
  };

  if (loadingCentre) {
    return <div className="edite-centre-container">
      <div className="edite-centre-contant">
        <span className="text-danger fs-4">Chargement Edite centre ...</span>
      </div>
    </div>
  }

  return (
    <div className="edite-centre-container">
      <div className="edite-centre-contant">
        <h1>
          Modifier Centre : <span className="text-white fs-5">{centre?.nom}</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="group-input">
            <label htmlFor="">
              Nom  <span className="text-danger">*</span> :
            </label>
            <input
              type="text"
              id="nom"
              defaultValue={centre?.nom}
              onChange={handleChange}
            />
          </div>
          {editeCentreError && <div className="mt-2 text-danger ">{editeCentreError}</div>}
          <button
            type="submit"
            className={`${disableBtnEditeCentre && "btn disabled"} ${disableEdite ? "disabled-button" : "open-button"}`}
          >
            {loadingEditeCentre ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Modifier"
            )}
          </button>
          <div className="text-center text-danger mt-4">
            {getCentreError && <p>Error: {getCentreError.message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditeCentre;
