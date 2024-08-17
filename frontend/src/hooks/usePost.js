import { useState } from "react";

const BASE_URL = "http://localhost:5000";

export default function usePost(resource, callback) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const post = async (body = {}) => {
    const URL = `${BASE_URL}/${resource}`;
    setDisabledBtn(true);
    setLoading(true);
    try {
      const response = await fetch(URL, {
        method: "POST",
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
    post,
    disabledBtn,
  };
}
