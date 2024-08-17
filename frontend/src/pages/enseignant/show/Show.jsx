import React, { useEffect } from "react";
import "./Show.css";
import Link from "../../../components/share/Link";
import { MdOutlineDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";

function Show() {
  const {
    get: getEnseignants,
    data: enseignants,
    loading: loadingEnseignants,
    error: enseignantsError,
  } = useGet("enseignants", []);
  const {
    Delete: deleteEnseignant,
    error: deleteError,
    disabledBtn: deleteDisableBtn,
  } = useDelete(`enseignant`, getEnseignants);

  useEffect(() => {
    getEnseignants();
  }, []);

  const handleDelete = (id) => {
    deleteEnseignant(id);
  };

  console.log(enseignants);

  return (
    <div className="enseignant-container">
      <div className="enseignant-contant">
        <div className="header">
          <h1>Enseignants</h1>
          <Link
            className="btn btn-outline-primary"
            text="nouvelle enseignant"
            to="create"
          />
        </div>
        <div className="body table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>numéro de téléphone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {enseignants.map((e) => (
                <tr key={e.id}>
                  <td>{e.nom}</td>
                  <td>{e.prenom}</td>
                  <td>{e.email ? e.email : '------'}</td>
                  <td>{e.tel ? e.tel : '-------'}</td>
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
              {loadingEnseignants && (
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
                </tr>
              )}
            </tbody>
          </table>

          {enseignantsError && (
            <span className="text-danger fs-3">
              Error: {enseignantsError.message}
            </span>
          )}
          {deleteError && <p className="text-danger" >Error : {deleteError.message} niveaux</p>}
        </div>
      </div>
    </div>
  );
}

export default Show;
