import React, { useEffect, useState } from "react";
import "./Show.css";
import { IoEyeOutline } from "react-icons/io5";
import Link from "../../../components/share/Link";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";

function Show() {
  const {
    data: matieres,
    get: getMatieres,
    error: matieresError,
    loading: loadingMatieres,
  } = useGet("matieres", []);
  const {
    data: niveaux,
    get: getNiveaux,
    error: niveauxError,
    loading: loadingNiveaux,
  } = useGet("niveaux", []);
  const {
    Delete: deleteMatiere,
    error: deleteMatiereError,
    disabledBtn: deleteDisableBtn,
  } = useDelete("matiere", getMatieres);

  const [filteredMatieres, setFilteredMatieres] = useState([]);
  const [filterMatieres, setFilterMatieres] = useState({
    filterByNom: "",
    filterByNiveau: "",
  });

  console.log(matieres)

  useEffect(() => {
    getMatieres();
    getNiveaux();
  }, []);

  useEffect(() => {
    filterData();
  }, [matieres, filterMatieres]);

  const filterData = () => {
    const { filterByNom, filterByNiveau } = filterMatieres;
    let filtered = matieres;

    if (filterByNom) {
      const searchTerm = filterByNom.toLowerCase().trim();
      filtered = filtered.filter((matiere) =>
        matiere.nom.toLowerCase().includes(searchTerm)
      );
    }

    if (filterByNiveau) {
      filtered = filtered.filter(
        (matiere) => matiere.NiveauxId === parseInt(filterByNiveau)
      );
    }

    setFilteredMatieres(filtered);
  };

  const handleDelete = (id) => {
    deleteMatiere(id);
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilterMatieres({ ...filterMatieres, [id]: value });
  };

  if (matieresError) {
    return <h1 className="text-center text-danger mt-5">Error: {matieresError.message} matieres</h1>;
  }

  return (
    <div className="matiere-container">
      <div className="matiere-titel">
        <h1>Liste de matières</h1>
        <Link
          className="btn btn-outline-primary"
          text="Nouvelle matière"
          to="create"
        />
      </div>
      <div className="filterArray">
        <input
          className="text-light"
          type="text"
          id="filterByNom"
          placeholder="Filter by name"
          onChange={handleFilterChange}
        />
        <select
          id="filterByNiveau"
          onChange={handleFilterChange}
          disabled={loadingNiveaux}
        >
          <option value="">Filter by niveaux</option>
          {niveaux.map((niveau) => (
            <option key={niveau.id} value={niveau.id}>
              {niveau.nom}
            </option>
          ))}
        </select>
      </div>
      {!matieres.length && !loadingMatieres && (
        <div>
          <h1 className="text-danger text-center">Il n'y a pas de matière, ajoutez-la</h1>
        </div>
      )}
      <div className="matiere-contant">
        {loadingMatieres ? (
          <div className="spinner-grow text-light" role="status">
            Chargement des matières...
          </div>
        ) : (
          filteredMatieres.map((matiere, index) => (
            <div className="matiere-carte" key={index}>
              <div className="d-flex justify-content-end align-items-center mb-1">
                <Link
                  className="btn btn-outline-light button"
                  icon={<IoEyeOutline />}
                  to={`details/${matiere.id}/eleves`}
                />
                <Link
                  className="btn btn-outline-warning"
                  icon={<FiEdit2 />}
                  to={`edite/${matiere.id}`}
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(matiere.id)}
                  disabled={deleteDisableBtn}
                >
                  <MdOutlineDelete />
                </button>
              </div>
              <h1>{matiere.nom}</h1>
              <div className="Row">
                <p>Elèves</p>:<span>{matiere.totalEleves}</span>
              </div>
              <div className="Row">
                <p>Enseignant</p>:<span>{matiere.enseignant.nom}</span>
              </div>
              <div className="Row">
                <p>Niveau</p>:<span>{matiere.niveau.nom}</span>
              </div>
            </div>
          ))
        )}
      </div>
      {deleteMatiereError && <p className="text-danger mt-3">Error: {deleteMatiereError.message} Delete Matiere</p>}
      {niveauxError && <p className="text-danger mt-3">Error: {niveauxError.message} niveaux</p>}
    </div>
  );
}

export default Show;
