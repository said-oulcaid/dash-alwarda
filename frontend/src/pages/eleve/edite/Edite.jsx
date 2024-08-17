import React, { useEffect, useState } from "react";
import "./Edite.css";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import useUpdate from "../../../hooks/useUpdate";
import { GoX } from "react-icons/go";

function Edite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [disableEdite, setDisableEdite] = useState(true);

  const {
    get: getEleve,
    data: eleve,
    loading: loadingEleve,
    error: eleveError,
  } = useGet(`eleve/${id}`);
  const {
    get: getMatieres,
    data: matieres,
    loading: loadingMatieres,
    error: MatieresError,
  } = useGet(`matieres`, []);
  const {
    data: niveaux,
    get: getNiveaux,
    error: niveauxError,
    loading: loadingNiveaux,
  } = useGet("niveaux", []);
  const {
    loading: loadingEditeEleve,
    error: postError,
    update: updateEleve,
    disabledBtn,
  } = useUpdate(`eleve/edite/${id}`, {});

  useEffect(() => {
    getEleve();
    getMatieres();
    getNiveaux();
  }, []);

  useEffect(() => {
    if (eleve) {
      setMultiSelect(eleve.Matieres || []);
      setFormData({
        nom: eleve.nom,
        prenom: eleve.prenom,
        NiveauxId: eleve.NiveauxId,
        tel_parent: eleve.tel_parent,
        tel_eleve: eleve.tel_eleve,
        matiereIds: eleve.Matieres?.map((m) => m.id) || [],
      });
    }
  }, [eleve]);

  const [multiSelect, setMultiSelect] = useState([]);

  const handleMatiereSelection = (e) => {
    const value = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedValue = { nom: selectedOption.innerText, id: value };
    if (value > 0 && !multiSelect.some((m) => m.id === parseInt(value))) {
      const updatedMultiSelect = [...multiSelect, selectedValue];
      setMultiSelect(updatedMultiSelect);
      setFormData({
        ...formData,
        matiereIds: updatedMultiSelect.map((m) => parseInt(m.id)),
      });
    }
  };

  const handleCancelMatiere = (id) => {
    const updatedMultiSelect = multiSelect.filter((m) => m.id !== id);
    setMultiSelect(updatedMultiSelect);
    setFormData({
      ...formData,
      matiereIds: updatedMultiSelect.map((m) => parseInt(m.id)),
    });
  };

  const checkDisableEdite = () => {
    const { nom, prenom, NiveauxId, tel_parent, tel_eleve, matiereIds } =
      formData;
    const isFormValid =
      (nom && nom.trim() !== eleve?.nom) ||
      (prenom && prenom.trim() !== eleve?.prenom) ||
      (NiveauxId && parseInt(NiveauxId) !== eleve?.NiveauxId) ||
      (tel_parent && tel_parent.trim() !== eleve?.tel_parent) ||
      (tel_eleve && tel_eleve.trim() !== eleve?.tel_eleve) ||
      (matiereIds &&
        matiereIds.length > 0 &&
        JSON.stringify(matiereIds.sort()) !==
        JSON.stringify(eleve?.Matieres.map((e) => e.id).sort()));
    setDisableEdite(!isFormValid);
  };

  useEffect(() => {
    checkDisableEdite();
  }, [formData, eleve]);

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;
    setFormData({ ...formData, [field]: value });
    checkDisableEdite();
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!disableEdite) {
      updateEleve(formData, () => navigate(-1));
    }
  };


  return (
    <div className="edite-eleve-container">
      <div className="edite-eleve-contant">
        <h1>
          modifier :
          <span className="text-white fs-5">
            {eleve?.nom} {eleve?.prenom}
          </span>
        </h1>
        <form onSubmit={handelSubmit}>
          <div className="double-input">
            <div className="group-input">
              <label htmlFor="">
                Nom : <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="nom"
                defaultValue={eleve?.nom}
                onChange={handleChange}
              />
            </div>
            <div className="group-input">
              <label htmlFor="">
                Prénom : <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="prenom"
                defaultValue={eleve?.prenom}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="group-input">
            <label htmlFor="">Numéro téléphone de parent :</label>
            <input
              type="text"
              id="tel_parent"
              defaultValue={eleve?.tel_parent}
              onChange={handleChange}
            />
          </div>
          <div className="group-input">
            <label htmlFor="">Numéro téléphone de élève :</label>
            <input
              type="text"
              id="tel_eleve"
              defaultValue={eleve?.tel_eleve}
              onChange={handleChange}
            />
          </div>
          <div className="group-input">
            <label htmlFor="">
              Niveau de l'élève : <span className="text-danger">*</span>
            </label>
            <select id="NiveauxId" onChange={handleChange}>
              {loadingNiveaux ? (
                <option value=""> loading ...</option>
              ) : (
                <option value={eleve?.NiveauxId}>{eleve?.Niveaux?.nom}</option>
              )}
              {niveaux
                .filter((m) => eleve.NiveauxId !== m.id)
                .map((m) => (
                  <option value={m.id} key={m.id}>
                    {m.nom}
                  </option>
                ))}
            </select>
          </div>
          <div className="group-input">
            <label htmlFor="">
              Matiere : <span className="text-danger">*</span>
            </label>
            <div className="matiere-select-contant">
              {multiSelect.map((m) => (
                <span key={m.id}>
                  {m.nom}
                  <div
                    className="cancel-matiere"
                    onClick={() => handleCancelMatiere(m.id)}
                  >
                    <GoX />
                  </div>
                </span>
              ))}
            </div>
            <select id="matiere" onChange={handleMatiereSelection}>
              {loadingMatieres ? (
                <option value="">Loading...</option>
              ) : (
                <option value="">select matieres</option>
              )}
              {matieres
                .filter((m) => !formData?.matiereIds?.includes(m.id))
                .map((e) => (
                  <option value={e.id} key={e.id}>
                    {e.nom}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className={`${disabledBtn && "btn disabled"} ${disableEdite ? "disabled-button" : "open-button"
              } `}
          >
            {loadingEditeEleve ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Modifier"
            )}
          </button>
          <div className="text-center text-danger mt-4">
            {postError && <p>Error : {postError.message} élève</p>}
            {eleveError && <p>Error : {eleveError.message} élève</p>}
            {MatieresError && <p>Error : {MatieresError.message} matieres</p>}
            {niveauxError && <p>Error : {niveauxError.message} niveaux</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edite;
