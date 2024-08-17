import React, { useEffect, useState } from "react";
import "./Show.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import Link from "../../../components/share/Link";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";

function Show() {
  const {
    data: eleves,
    get: getEleves,
    loading,
    error: getError,
  } = useGet("eleve", []);
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
    Delete: deleteEleve,
    error: deleteError,
    disabledBtn: deleteDisableBtn,
  } = useDelete(`eleve`, getEleves);

  const [filteredEleves, setFilteredEleves] = useState([]);
  const [filterEleves, setFilterEleves] = useState({
    filterByNiveau: "",
    filterByCentre: "",
    filterByNom: "",
  });
  const [current, setCurrent] = useState(1);

  const itemsPerPage = 13;

  useEffect(() => {
    getEleves();
    getNiveaux();
    getCentres();
  }, []);

  useEffect(() => {
    filterData();
  }, [eleves, filterEleves]);

  const filterData = () => {
    const { filterByNiveau, filterByCentre, filterByNom } = filterEleves;
    let filtered = eleves;

    if (filterByNiveau) {
      filtered = eleves.filter((e) => e.NiveauxId === parseInt(filterByNiveau));
    }
    if (filterByCentre) {
      filtered = filtered.filter(
        (e) => e.CentreId === parseInt(filterByCentre)
      );
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleDelete = (id) => {
    deleteEleve(id);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;

    setFilterEleves({ ...filterEleves, [field]: value });
  };

  const reversedData = [...filteredEleves].reverse();
  const totalItems = reversedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const dataToDisplay = reversedData.slice(startIndex, endIndex);

  return (
    <div className="eleve-container">
      <div className="eleve-contant">
        <div className="header">
          <div className="">
            <h1>Elèves</h1>
          </div>
          <Link
            className="btn btn-outline-primary"
            text="nouvelle élève"
            to="create"
          />
        </div>
        <input
          type="text"
          id="filterByNom"
          placeholder="Recherche"
          onChange={handleFilterChange}
        />
        <div className="body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prenom</th>
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
                <th>
                  {loadingCentre ? (
                    "Centre d'inscription"
                  ) : (
                    <select
                      name=""
                      id="filterByCentre"
                      onChange={handleFilterChange}
                    >
                      <option value="">Centre d'inscription</option>
                      {centres.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.nom}
                        </option>
                      ))}
                    </select>
                  )}
                </th>
                <th>date d'inscription</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((e) => (
                <tr key={e.id}>
                  <td>{capitalizeFirstLetter(e.nom)}</td>
                  <td>{capitalizeFirstLetter(e.prenom)}</td>
                  <td>{e.Niveaux?.nom}</td>
                  <td>{e.Centre?.nom} </td>
                  <td>
                    {e.date_inscription &&
                      new Date(e.date_inscription).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </td>
                  <td className="td-button">
                    <Link
                      className="btn btn-outline-secondary button"
                      icon={<IoEyeOutline />}
                      to={`details/${e.id}`}
                    />
                    <Link
                      className="btn btn-outline-warning"
                      icon={<FiEdit2 />}
                      to={`edite/${e.id}`}
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
              {loading && (
                <tr>
                  <td>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                  <td>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                  <td>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                  <td>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                  <td>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                  <td>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary fs-5"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {getError && (
          <span className="text-danger fs-3">Error: {getError.message}</span>
        )}
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
                    current < totalPages && setCurrent(current + 1)
                  }
                >
                  <GrFormNext />
                </span>
              </li>
            </ul>
          </nav>
        )}
        {centresError && <p>Error : {centresError.message} centres</p>}
        {niveauxError && <p>Error : {niveauxError.message} niveaux</p>}
        {deleteError && <p>Error : {deleteError.message} niveaux</p>}
      </div>
    </div>
  );
}

export default Show;
