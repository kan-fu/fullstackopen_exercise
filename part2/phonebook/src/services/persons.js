import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const updatePerson = (id, newPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const personService = {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
};
export default personService;
