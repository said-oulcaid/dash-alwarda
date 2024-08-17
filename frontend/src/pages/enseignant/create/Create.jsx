import React, { useEffect, useState } from "react";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";

function Create() {
  const navigate = useNavigate();

  const {
    post: postEnseignant,
    loading: loadingPost,
    error: postError,
    disabledBtn,
  } = usePost("enseignant", () => navigate(-1));

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    tel: "",
    email: ""
  });

  const [errors, setErrors] = useState({});
  const [disableCreate, setDisableCreate] = useState(true);

  const checkDisableCreate = () => {
    const { nom, prenom } = formData;

    const isFormValid = nom.trim() !== "" && prenom.trim() !== "";

    setDisableCreate(!isFormValid);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }
    if (formData.tel && !formData.tel.match(/^[+]?[1-9][0-9\s\-().]{9,14}$/)) {
      newErrors.tel = "Veuillez fournir un numéro de téléphone valide";
    }
    if (
      formData.email &&
      !formData.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      newErrors.email = "Veuillez fournir une adresse e-mail valide";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    checkDisableCreate();
  }, [formData]);

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;

    setFormData({ ...formData, [field]: value });

    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && !disableCreate) {
      postEnseignant(formData);
    }
  };

  return (
    <div className="create-Enseignant-container">
      <div className="create-Enseignant-contant">
        <h1>Ajouter Enseignant</h1>
        <form onSubmit={handleSubmit}>
          <div className="double-input">
            <div className="group-input">
              <label>
                Nom : <span className="text-danger">*</span>
              </label>
              <input type="text" id="nom" onChange={handleChange} />
              {errors.nom && <p className="Error">{errors.nom}</p>}
            </div>
            <div className="group-input">
              <label>
                Prénom : <span className="text-danger">*</span>
              </label>
              <input type="text" id="prenom" onChange={handleChange} />
              {errors.prenom && <p className="Error">{errors.prenom}</p>}
            </div>
          </div>
          <div className="group-input">
            <label>Numéro téléphone :</label>
            <input type="text" id="tel" onChange={handleChange} />
            {errors.tel && <p className="Error">{errors.tel}</p>}
          </div>
          <div className="group-input">
            <label>Email :</label>
            <input type="text" id="email" onChange={handleChange} />
            {errors.email && <p className="Error">{errors.email}</p>}
          </div>

          <button
            type="submit"
            className={`${disabledBtn && "btn disabled"} ${
              disableCreate ? "disabled-button" : "open-button"
            } `}
          >
            {loadingPost ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Ajouter"
            )}
          </button>
        </form>
        {postError && <p className="text-danger">{postError?.message}</p>}
      </div>
    </div>
  );
}

export default Create;
