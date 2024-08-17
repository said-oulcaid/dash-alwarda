import { useState } from "react";

const BASE_URL = "http://localhost:5000";

const useDelete = (resource ,callback) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const Delete = (id) => {
    try {
      const url = BASE_URL + "/" + resource + "/" + id;
      setLoading(true);
      setDisabledBtn(true)
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setData(data);
          setError(null);
          callback && callback();
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
          setDisabledBtn(false)
        });
    } catch (err) {
      setError(new Error("failed to Delete"));
    }
  };
  return { Delete, disabledBtn, error, loading, data };
};
export default useDelete;
