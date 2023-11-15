import axios from "axios";
const baseUrl = "/api/blogs";

function config() {
  let { token } = JSON.parse(window.localStorage.getItem("loggedUser"));
  return { headers: { Authorization: `Bearer ${token}` } };
}

const getAll = () => {
  let headers = config();
  const request = axios.get(baseUrl, headers);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  let headers = config();

  const request = axios.post(baseUrl, newObject, headers);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  let headers = config();

  const request = axios.put(`${baseUrl}/${id}`, newObject, headers);
  return request.then((response) => response.data);
};

function deleteOne(id) {
  let headers = config();
  return axios.delete(`${baseUrl}/${id}`, headers);
}

export default { getAll, create, update, deleteOne };
