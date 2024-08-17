import React, { useEffect, useState } from "react";
import './Create.css'
import { useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";

function Create() {
  const navigate = useNavigate()
  const [disableCreateBtN, setDisableCreateBtn] = useState(true)

  const [formData, setFormData] = useState({
    nom: ''
  })

  const {
    data,
    post: postNiveau,
    loading: loadingPost,
    error: postError,
    disabledBtn,
  } = usePost("niveau", () => navigate(-1));

  const checkDisableCreate = () => {
    const { nom } = formData
    const isFormValid = nom.trim() !== ''
    setDisableCreateBtn(!isFormValid)
  }

  useEffect(() => {
    checkDisableCreate()
  }, [formData])

  const handleChange = (e) => {
    const field = e.target.id
    const value = e.target.value
    setFormData({ ...formData, [field]: value.trim() })
    checkDisableCreate()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!disableCreateBtN) {
      postNiveau(formData)
    }
  }

  return (
    <div className="create-niveau-container">
      <div className="create-niveau-contant">
        <h1>Ajouter Niveau</h1>
        <form onSubmit={handleSubmit}>
          <div className="group-input">
            <label htmlFor="">Nom:</label>
            <input type="text" id="nom" onChange={handleChange} />
            {postError && <div className="mt-2 text-danger ">{postError}</div>}
          </div>
          <button
            type="submit"
            className={`${disabledBtn && "btn disabled"} ${disableCreateBtN ? "disabled-button" : "open-button"
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
        </form>
      </div>
    </div>
  );
}

export default Create;
