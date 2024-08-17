import { useEffect, useState } from "react";
import "./Create.css";
import usePost from "../../../hooks/usePost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import { GoX } from "react-icons/go";

function Create() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    data: centres,
    get: getCentres,
    error: centresError,
    loading: loadingCentre,
  } = useGet("centres", []);
  const {
    data: niveaux,
    get: getNiveaux,
    error: niveauxError,
    loading: loadingNiveaux,
  } = useGet("niveaux", []);
  const {
    data: matieres,
    get: getMatieres,
    error: matieresError,
    loading: loadingMatieres,
  } = useGet("matieres", []);
  const {
    post: postEleve,
    loading: loadingPost,
    error: postError,
    disabledBtn,
  } = usePost("eleve", () => navigate(-1));
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    tel_parent: "",
    tel_eleve: "",
    date_inscription: "",
    niveauxId: "",
    centreId: "",
    inscription_par: `${user.user.firstname} ${""} ${user.user.lastname}`,
    matiereIds: [],
  });

  useEffect(() => {
    getCentres();
    getNiveaux();
    getMatieres();
  }, []);

  const [errors, setErrors] = useState({});
  const [disableCreate, setDisableCreate] = useState(true);

  useEffect(() => {
    checkDisableCreate();
  }, [formData]);

  const [multiSelect, setMultiSelect] = useState([]);

  const handleMatiereSelection = (e) => {
    const value = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedValue = { nom: selectedOption.innerText, id: value };
    if (value > 0) {
      setMultiSelect([...multiSelect, selectedValue]);
      setFormData({
        ...formData,
        matiereIds: [...formData.matiereIds, parseInt(value)],
      });
    }
    return;
  };

  const handleCancelMatiere = (id) => {
    const updatedMultiSelect = multiSelect.filter((m) => m.id !== id);
    setMultiSelect(updatedMultiSelect);
    setFormData({
      ...formData,
      matiereIds: updatedMultiSelect.map((m) => parseInt(m.id)),
    });
  };

  useEffect(() => {
    getMatieres();
  }, [multiSelect]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }
    if (!formData.date_inscription.trim()) {
      newErrors.date_inscription = "La date est requise";
    }
    if (!formData.niveauxId) {
      newErrors.niveauxId = "Le niveau est requis";
    }
    if (!formData.centreId) {
      newErrors.centreId = "Le centre est requis";
    }
    if (formData.matiereIds.length === 0) {
      newErrors.matiereIds = "Au moins une matière doit être sélectionnée";
    }
    if (formData.tel_parent && !formData.tel_parent.match(/^[1-9][0-9]{9}$/)) {
      newErrors.tel_parent = "Veuillez fournir un numéro de téléphone valide";
    }
    if (formData.tel_eleve && !formData.tel_eleve.match(/^[1-9][0-9]{9}$/)) {
      newErrors.tel_eleve = "Veuillez fournir un numéro de téléphone valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkDisableCreate = () => {
    const { nom, prenom, date_inscription, niveauxId, centreId, matiereIds } =
      formData;
    const isFormValid =
      nom.trim() !== "" &&
      prenom.trim() !== "" &&
      date_inscription.trim() !== "" &&
      niveauxId &&
      centreId &&
      matiereIds.length > 0;

    setDisableCreate(!isFormValid);
  };

  const handelChange = (e) => {
    let value = e.target.value;
    let field = e.target.id;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [field]: value };
      if (field === "niveauxId") {
        updatedData.matiereIds = [];
        setMultiSelect([]);
      }
      return updatedData;
    });
    checkDisableCreate();
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && !disableCreate) {
      postEleve(formData);
    }
  };

  const filteredMatieres = matieres.filter(
    (m) => m.NiveauxId === parseInt(formData.niveauxId)
  );

  return (
    <div className="create-eleve-container">
      <div className="create-eleve-contant">
        <h1>Ajouter Elève</h1>
        <form onSubmit={handelSubmit}>
          <div className="double-input">
            <div className="group-input">
              <label htmlFor="">
                Nom : <span className="text-danger">*</span>
              </label>
              <input type="text" onChange={handelChange} id="nom" />
              {errors.nom && <p className="Error">{errors.nom}</p>}
            </div>
            <div className="group-input">
              <label htmlFor="">
                Prénom : <span className="text-danger">*</span>
              </label>
              <input type="text" onChange={handelChange} id="prenom" />
              {errors.prenom && <p className="Error">{errors.prenom}</p>}
            </div>
          </div>
          <div className="double_error">
            {errors.nom && <p className="Error">{errors.nom}</p>}
            {errors.prenom && <p className="Error">{errors.prenom}</p>}
          </div>
          <div className="group-input">
            <label htmlFor="">Numéro téléphone de parent :</label>
            <input type="text" onChange={handelChange} id="tel_parent" />
            {errors.tel_parent && <p className="Error">{errors.tel_parent}</p>}
          </div>
          <div className="group-input">
            <label htmlFor="">Numéro téléphone de élève :</label>
            <input type="text" onChange={handelChange} id="tel_eleve" />
            {errors.tel_eleve && <p className="Error">{errors.tel_eleve}</p>}
          </div>
          <div className="group-input">
            <label htmlFor="">
              Date d'inscription : <span className="text-danger">*</span>
            </label>
            <input type="date" onChange={handelChange} id="date_inscription" />
            {errors.date_inscription && (
              <p className="Error">{errors.date_inscription}</p>
            )}
          </div>
          <div className="double-input">
            <div className="group-input">
              <label htmlFor="">
                Niveau de l'élève : <span className="text-danger">*</span>
              </label>
              <select onChange={handelChange} id="niveauxId">
                <option value="">Sélectionnez le niveau</option>
                {loadingNiveaux && <option value=""> loading ...</option>}
                {niveaux.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.nom}
                  </option>
                ))}
              </select>
              {errors.niveauxId && <p className="Error">{errors.niveauxId}</p>}
            </div>
            <div className="group-input">
              <label htmlFor="">
                Centre d'inscription : <span className="text-danger">*</span>
              </label>
              <select onChange={handelChange} id="centreId">
                <option value="">Sélectionnez le centre</option>
                {loadingCentre && <option value=""> loading ...</option>}
                {centres.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom}
                  </option>
                ))}
              </select>
              {errors.centreId && <p className="Error">{errors.centreId}</p>}
            </div>
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
                    onClick={() => {
                      handleCancelMatiere(m.id);
                    }}
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
              {filteredMatieres
                .filter((m) => !formData.matiereIds.includes(m.id))
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nom}
                  </option>
                ))}
            </select>
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
          <div className="text-center text-danger mt-4">
            {postError && <p className="text-danger">{postError?.message}</p>}
            {centresError && (
              <p className="text-danger">{centresError?.message} centres</p>
            )}
            {niveauxError && (
              <p className="text-danger">{niveauxError?.message} niveaux</p>
            )}
            {matieresError && (
              <p className="text-danger">{matieresError?.message} matieres</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
