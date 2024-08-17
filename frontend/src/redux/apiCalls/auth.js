import { request } from "../../utils/request";
import { authActions } from "../slices/authSlice";

export const login = (user) => {
    return async (dispatch) => {
        dispatch(authActions.setLoading(true));
        dispatch(authActions.setError(null));
        dispatch(authActions.setUser(null));
        request
            .post("/login", user)
            .then((res) => {
                dispatch(authActions.setUser(res.data));
                console.log(res)
                localStorage.setItem("userInfo", JSON.stringify(res.data));
            })
            .catch((err) => {
                dispatch(authActions.setUser(null));
                dispatch(authActions.setError(err.response.data.message));
                console.log(err)
            })
            .finally(() => dispatch(authActions.setLoading(false)));
    };
};
export const logOut = () => {
    return async (dispatch) => {
        dispatch(authActions.setUser(null));
        localStorage.removeItem("userInfo");
    };
};
