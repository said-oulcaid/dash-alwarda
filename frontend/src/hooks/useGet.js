import { useState } from "react";

const BASE_URL = "http://localhost:5000";

const useGet = (resource, initialValue = null ,callback) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = () => {
    const url = BASE_URL + "/" + resource;
    try {
      setLoading(true);
      setData(initialValue);
      fetch(url)
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
        });
    } catch (error) {
      setError(new Error("failed to fetch"));
    }
  };
  return { get, data, loading, error };
};

export default useGet;
