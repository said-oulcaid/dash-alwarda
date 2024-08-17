import React, { useEffect } from "react";
import "./Show.css";
import { IoEyeOutline } from "react-icons/io5";
import Link from "../../../components/share/Link";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import useGet from "../../../hooks/useGet";
import useDelete from "../../../hooks/useDelete";

function Show() {
  const {
    get: getCentres,
    data: centres,
    loading: loadingCentres,
    error: centresError,
  } = useGet("centres", []);
  const {
    Delete: deleteCentre,
    error: deleteCentreError,
    disabledBtn: deleteDisableBtn,
  } = useDelete(`centre`, getCentres);

  useEffect(() => {
    getCentres()
  }, [])


  const handleDelete = (id) => {
    deleteCentre(id)
  }

  if (centresError) {
    return <h1 className="text-center text-danger mt-5">Error : {centresError?.message} centres</h1>
  }

  return (
    <div className="centre-container">
      <div className="centre-titel">
        <h1>Liste de Centres</h1>
        <Link
          className="btn btn-outline-primary"
          text="nouvelle centre"
          to="create"
        />
      </div>
      {!centres.length && !loadingCentres
        &&
        <div>
          <h1 className="text-danger text-center">Il n'y a pas de centre, ajoutez-le</h1>
        </div>
      }
      <div className="centre-contant">
        {loadingCentres ?
          <div className="spinner-grow text-light " role="status">
            Chargement du centre ...
          </div>
          : centres.map((e, index) => (
            <div className="centre-carte" key={index} >
              <div className="d-flex justify-content-end align-items-center mb-1">
                <Link
                  className="btn btn-outline-light button"
                  icon={<IoEyeOutline />}
                  to={`details/${e.id}/eleves`}
                />
                <Link
                  className="btn btn-outline-warning"
                  icon={<FiEdit2 />}
                  to={`edite/${e.id}`}
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(e.id)}
                  disabled={deleteDisableBtn}
                >
                  <MdOutlineDelete />
                </button>
              </div>
              <h1>{e.nom}</h1>
              <div className="Row">
                <p>Elèves</p>:<span>{e.totalEleves}</span>
              </div>
            </div>
          ))}
      </div>
      {deleteCentreError && <p className="text-danger mt-3">Error : {deleteCentreError.message} Delete Centre</p>}
    </div>
  );
}

export default Show;
