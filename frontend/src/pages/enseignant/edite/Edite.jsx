import React, { useEffect, useState } from 'react'
import './Edite.css'
import { useNavigate, useParams } from 'react-router-dom'
import useGet from '../../../hooks/useGet';
import useUpdate from '../../../hooks/useUpdate';

function Edite() {
  const { id } = useParams()
  const [formData, setFormData] = useState({});
  const [disableEdite, setDisableEdite] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const {
    get: getEnseignant,
    data: enseignant,
    loading: loadingEnseignant,
    error: getEnseignantError,
  } = useGet(`enseignant/${id}`);
  const {
    loading: loadingEditeEnseignant,
    error: editeEnseignantError,
    update: updateEnseignant,
    disabledBtn: disableBtnEditeEnseignant,
  } = useUpdate(`enseignant/edite/${id}`, {});

  useEffect(() => {
    getEnseignant()
  }, [])

  useEffect(() => {
    if (enseignant) {
      setFormData({
        nom: enseignant.nom,
        prenom: enseignant.prenom,
        tel: enseignant.tel,
        email: enseignant.email,
      });
    }
  }, [enseignant]);

  const checkDisableEdite = () => {
    const { nom, prenom, tel, email } = formData;
    const isFormValid =
      (nom && nom.trim() !== enseignant?.nom) ||
      (prenom && prenom.trim() !== enseignant?.prenom) ||
      (email && email.trim() !== enseignant?.email) ||
      (tel && tel.trim() !== enseignant?.tel) 

    setDisableEdite(!isFormValid);
  }
  console.log(disableEdite)

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }
    if (formData.tel && !formData.tel.match(/^[1-9][0-9]{9}$/)) {
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
    checkDisableEdite();
  }, [formData, enseignant]);

  const handleChange = (e) => {
    const value = e.target.value
    const field = e.target.id
    setFormData({ ...formData, [field]: value })
    checkDisableEdite()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm() && !disableEdite) {
      updateEnseignant(formData, () => navigate("/enseignant"))
    }
  }


  if (loadingEnseignant) {
    return <div className="edite-Enseignant-container">
      <div className="edite-Enseignant-contant">
        <h1 className=''> Chargement des informations sur le enseignant ...</h1>
      </div>
    </div>
  }

  if (getEnseignantError || editeEnseignantError) {
    return <div className="edite-Enseignant-container">
      <div className="edite-Enseignant-contant">
        <h1 className=''> Error : {getEnseignantError?.message || editeEnseignantError?.message} enseignant </h1>
      </div>
    </div>
  }

  return (
    <div className="edite-Enseignant-container">
      <div className="edite-Enseignant-contant">
        <h1>
          modifier :
          <span className="text-white fs-5">
            {enseignant?.nom} {enseignant?.prenom}
          </span>
        </h1>
        <form onSubmit={handleSubmit} >
          <div className="double-input">
            <div className="group-input">
              <label>
                Nom : <span className="text-danger">*</span>
              </label>
              <input type="text" id="nom" defaultValue={enseignant?.nom} onChange={handleChange} />
              {errors.nom && <p className="Error">{errors.nom}</p>}
            </div>
            <div className="group-input">
              <label>
                Prénom : <span className="text-danger">*</span>
              </label>
              <input type="text" id="prenom" defaultValue={enseignant?.prenom} onChange={handleChange} />
              {errors.prenom && <p className="Error">{errors.prenom}</p>}
            </div>
          </div>
          <div className="group-input">
            <label>Numéro téléphone :</label>
            <input type="text" id="tel" defaultValue={enseignant?.tel} onChange={handleChange} />
            {errors.tel && <p className="Error">{errors.tel}</p>}
          </div>
          <div className="group-input">
            <label>Email :</label>
            <input type="text" id="email" defaultValue={enseignant?.email} onChange={handleChange} />
            {errors.email && <p className="Error">{errors.email}</p>}
          </div>
          <button
            type="submit"
            className={`${disableBtnEditeEnseignant && "btn disabled-button disabled"} ${disableEdite ? "disabled-button" : "open-button"
              } `}

          >
            {loadingEditeEnseignant ? (
              <>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </>
            ) : (
              "Edite"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Edite