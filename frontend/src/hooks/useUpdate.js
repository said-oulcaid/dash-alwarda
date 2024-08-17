import { useState } from "react";

const BASE_URL = "http://localhost:5000";

export default function useUpdate(resource, initialValue = null) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const update = async (body = {}, callback) => {
    const URL = `${BASE_URL}/${resource}`;
    setDisabledBtn(true);
    setLoading(true);
    try {
      const response = await fetch(URL, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }
      setData(data);
      setError(null);
      callback && callback();
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
      setDisabledBtn(false);
    }
  };

  return {
    data,
    loading,
    error,
    update,
    disabledBtn,
  };
}
