import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

function getAll() {
  const req = axios.get(baseUrl);
  return req.then((response) => response.data);
}

function addNew(newObject) {
  const req = axios.post(baseUrl, newObject);
  return req.then((response) => response.data);
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

function deletePerson(id) {
  axios.delete(`${baseUrl}/${id}`);
  return getAll();
}

const personService = {
  getAll,
  addNew,
  update,
  deletePerson,
};

export default personService;
