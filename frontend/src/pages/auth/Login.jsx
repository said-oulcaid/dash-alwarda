import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Login.css'
import { login } from "../../redux/apiCalls/auth";

function Login() {
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.auth)
    const [formData, setFomrData] = useState({
        email: "",
        password: "",
    });
    const handelChange = (e) => {
        let value = e.target.value
        let field = e.target.id
        setFomrData({ ...formData, [field]: value })
    }
    const handelSubmit = e => {
        e.preventDefault()
        dispatch(login(formData))
        console.log(formData)
    }
    return (
        <div className='login-container'>
            <div className="login-contant">
                <h1>Alwarda</h1>
                <form onSubmit={handelSubmit}>
                    <div className="form-outline mb-4">
                        <label className="form-label" value={formData.email} >Adresse e-mail :</label>
                        <input type="text" onChange={handelChange} className="form-control" id="email" />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" >Password :</label>
                        <input type="password" value={formData.password} onChange={handelChange} className="form-control" id="password" />
                    </div>
                    {error && <div className='Error'>{error}</div>}
                    <button type="submit">
                        {loading ?
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div> : 'Login'
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login