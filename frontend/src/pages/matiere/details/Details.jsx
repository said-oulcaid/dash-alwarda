import React, { useEffect, useState } from "react";
import Link from "../../../components/share/Link";
import { MdOutlineDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import useGet from "../../../hooks/useGet";
import { useParams } from "react-router-dom";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import './Details.css';
import useDelete from "../../../hooks/useDelete";

function MatiereDetails() {
  const { id } = useParams();

  const {
    get: getMatiereDetails,
    data: matiereDetails,
    loading: loadingMatiere,
    error: matiereError,
  } = useGet(`matiere/${id}/eleves`);

  const {
    Delete: deleteEleve,
    error: deleteError,
    disabledBtn: deleteDisableBtn,
  } = useDelete(`eleve`, getMatiereDetails);

  const [filteredEleves, setFilteredEleves] = useState([]);
  const [filterEleves, setFilterEleves] = useState({
    filterByNom: "",
  });
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 13;

  useEffect(() => {
    getMatiereDetails();
  }, [id]);

  useEffect(() => {
    filterData();
  }, [matiereDetails, filterEleves]);

  const filterData = () => {
    const { filterByNom } = filterEleves;
    let filtered = matiereDetails?.eleves || [];
    if (filterByNom) {
      const searchTerm = filterByNom.toLowerCase().trim();
      filtered = filtered.filter((e) => {
        const fullName = `${e.nom} ${e.prenom}`.toLowerCase();
        return fullName.includes(searchTerm);
      });
    }

    setFilteredEleves(filtered);
    setCurrent(1);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;

    setFilterEleves({ ...filterEleves, [field]: value });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleDelete = (id) => {
    deleteEleve(id);
  };
  console.log(matiereDetails)

  const totalItems = filteredEleves.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToDisplay = filteredEleves.slice(startIndex, endIndex);

  if (loadingMatiere) {
    return (
      <div className="matiere-details-container">
        <div className="matiere-details-content">
          <div className="spinner-grow Loading text-danger" role="status">
            Chargement détails de la matière...
          </div>
        </div>
      </div>
    );
  }

  if (matiereError) {
    return (
      <div className="matiere-details-container">
        <div className="matiere-details-content">
          <span className="text-danger fs-5">Error: {matiereError?.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="matiere-details-container">
      <div className="matiere-details-content">
        <div className="header">
          <h1>Matière : {matiereDetails?.nom}{`(${matiereDetails?.niveau?.nom})`}</h1>
        </div>
        <input
          type="text"
          id="filterByNom"
          placeholder="Recherche par nom"
          onChange={handleFilterChange}
        />
        <div className="body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((e, index) => (
                <tr key={e.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{capitalizeFirstLetter(e.nom)}</td>
                  <td>{capitalizeFirstLetter(e.prenom)}</td>
                  <td className="td-button">
                    <Link
                      className="btn btn-outline-secondary button"
                      icon={<IoEyeOutline />}
                      to={`/eleve/details/${e.id}`}
                    />
                    <Link
                      className="btn btn-outline-warning"
                      icon={<FiEdit2 />}
                      to={`/eleve/edite/${e.id}`}
                    />
                    <button
                      className={`btn btn-outline-danger`}
                      onClick={() => handleDelete(e.id)}
                      disabled={deleteDisableBtn}
                    >
                      <MdOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {deleteError && <div className="text-danger">Error: {deleteError?.message} Elève</div>}
        {totalPages > 1 && (
          <nav>
            <ul className="Pagination">
              <li>
                <span
                  className={`${current === 1 && "Disabled"}`}
                  onClick={() => current > 1 && setCurrent(current - 1)}
                >
                  <GrFormPrevious />
                </span>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li
                    className={`${current === page ? "active" : ""}`}
                    key={page}
                  >
                    <span onClick={() => setCurrent(page)}>{page}</span>
                  </li>
                )
              )}
              <li>
                <span
                  className={`${current === totalPages && "Disabled"}`}
                  onClick={() =>
                    current < totalPages && setCurrent(current + 1)
                  }
                >
                  <GrFormNext />
                </span>
              </li>
            </ul>
            <ul className="Pagination-mb">
              <li>
                <span
                  className={`${current === 1 && "Disabled"}`}
                  onClick={() => current > 1 && setCurrent(current - 1)}
                >
                  <GrFormPrevious />
                </span>
              </li>
              <li>
                <span>{`${current} of ${totalPages} pages`}</span>
              </li>
              <li>
                <span
                  className={`${current === totalPages && "Disabled"}`}
                  onClick={() =>
                    current < totalPages && setCurrent(current + 1)}
                >
                  <GrFormNext />
                </span>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default MatiereDetails;
