import { useEffect, useState } from "react";
import "./Create.css";
import usePost from "../../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import useGet from "../../../hooks/useGet";

function Create() {
  const navigate = useNavigate();
  const {
    data: enseignants,
    get: getEnseignants,
    error: enseignantsError,
    loading: loadingEnseignants,
  } = useGet("enseignants", []);
  const {
    data: niveaux,
    get: getNiveaux,
    error: niveauxError,
    loading: loadingNiveaux,
  } = useGet("niveaux", []);
  const {
    post: postMatiere,
    loading: loadingPost,
    error: postError,
    disabledBtn,
  } = usePost("matiere", () => navigate(-1));
  const [formData, setFormData] = useState({
    nom: "",
    prix: "",
    enseignantId: "",
    niveauId: "",
  });

  useEffect(() => {
    getEnseignants();
    getNiveaux();
  }, []);

  const [errors, setErrors] = useState({});
  const [disableCreate, setDisableCreate] = useState(true);

  useEffect(() => {
    checkDisableCreate();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!formData.prix.trim()) {
      newErrors.prix = "Le prix est requis";
    } else if (isNaN(formData.prix) || Number(formData.prix) <= 0) {
      newErrors.prix = "Le prix doit être un nombre supérieur à 0";
    }
    if (!formData.enseignantId) {
      newErrors.enseignantId = "L'enseignant est requis";
    }
    if (!formData.niveauId) {
      newErrors.niveauId = "Le niveau est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkDisableCreate = () => {
    const { nom, prix, enseignantId, niveauId } = formData;
    const isFormValid =
      nom.trim() !== "" &&
      prix.trim() !== "" &&
      !isNaN(prix) &&
      Number(prix) > 0 &&
      enseignantId &&
      niveauId;

    setDisableCreate(!isFormValid);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    checkDisableCreate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && !disableCreate) {
      postMatiere(formData);
    }
  };
  console.log(formData)

  return (
    <div className="create-matiere-container">
      <div className="create-matiere-contant">
        <h1>Ajouter Matière</h1>
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
                Prix : <span className="text-danger">*</span>
              </label>
              <input type="number" id="prix" onChange={handleChange} />
              {errors.prix && <p className="Error">{errors.prix}</p>}
            </div>
          </div>
          <div className="double-input">
            <div className="group-input">
              <label>
                Enseignant : <span className="text-danger">*</span>
              </label>
              <select onChange={handleChange} id="enseignantId">
                <option value="">Sélectionnez l'enseignant</option>
                {loadingEnseignants && <option value="">Loading...</option>}
                {enseignants.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nom}
                  </option>
                ))}
              </select>
              {errors.enseignantId && (
                <p className="Error">{errors.enseignantId}</p>
              )}
            </div>
            <div className="group-input">
              <label>
                Niveau : <span className="text-danger">*</span>
              </label>
              <select onChange={handleChange} id="niveauId">
                <option value="">Sélectionnez le niveau</option>
                {loadingNiveaux && <option value="">Loading...</option>}
                {niveaux.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.nom}
                  </option>
                ))}
              </select>
              {errors.niveauId && <p className="Error">{errors.niveauId}</p>}
            </div>
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
          {postError && <div className="mt-2 text-danger ">{postError}</div>}
          <div className="text-center text-danger mt-4">
            {postError && <p className="text-danger">{postError?.message}</p>}
            {enseignantsError && (
              <p className="text-danger">{enseignantsError?.message} enseignants</p>
            )}
            {niveauxError && (
              <p className="text-danger">{niveauxError?.message} niveaux</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
