import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": 'application/vnd.api+json',
      "Content-Type": 'application/vnd.api+json'
    }
  });
};

export default axiosWithAuth;