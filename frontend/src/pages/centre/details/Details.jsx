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

function Details() {
  const { id } = useParams();

  const {
    get: getCentreDetails,
    data: centreDetails,
    loading: loadingCentre,
    error: centreError,
  } = useGet(`centre/${id}/eleves`);

  const {
    data: niveaux,
    get: getNiveaux,
    error: niveauxError,
    loading: loadingNiveaux,
  } = useGet("niveaux", []);

  const {
    Delete: deleteEleve,
    error: deleteError,
    disabledBtn: deleteDisableBtn,
  } = useDelete(`eleve`, getCentreDetails);

  const [filteredEleves, setFilteredEleves] = useState([]);
  const [filterEleves, setFilterEleves] = useState({
    filterByNiveau: "",
    filterByNom: "",
  });
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 13;

  useEffect(() => {
    getNiveaux();
    getCentreDetails();
  }, [id]);

  useEffect(() => {
    filterData();
  }, [centreDetails, filterEleves]);

  const filterData = () => {
    const { filterByNiveau, filterByNom } = filterEleves;
    let filtered = centreDetails?.Eleves || [];
    console.log(filterByNiveau)
    if (filterByNiveau) {
      filtered = filtered.filter((e) => e.Niveaux?.id === parseInt(filterByNiveau, 10));
    }
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

  const totalItems = filteredEleves.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToDisplay = filteredEleves.slice(startIndex, endIndex);

  console.log(centreDetails)

  if (loadingCentre) {
    return (
      <div className="centre-details-container">
        <div className="centre-details-contant">
          <div className="spinner-grow Loading text-danger" role="status">
            Chargement détails centre ...
          </div>
        </div>
      </div>
    );
  }

  if (centreError) {
    return (
      <div className="centre-details-container">
        <div className="centre-details-contant">
          <span className="text-danger fs-5">Error: {centreError?.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="centre-details-container">
      <div className="centre-details-contant">
        <div className="header">
          <h1>Centre : {centreDetails?.nom}</h1>
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
                <th>
                  {loadingNiveaux ? (
                    "Niveau"
                  ) : (
                    <select
                      name=""
                      id="filterByNiveau"
                      onChange={handleFilterChange}
                    >
                      <option value="">Niveau</option>
                      {niveaux.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.nom}
                        </option>
                      ))}
                    </select>
                  )}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((e, index) => (
                <tr key={e.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{capitalizeFirstLetter(e.nom)}</td>
                  <td>{capitalizeFirstLetter(e.prenom)}</td>
                  <td>{e.Niveaux?.nom}</td>
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
        {niveauxError && <p>Error: {niveauxError.message} niveaux</p>}
      </div>
    </div>
  );
}

export default Details;
