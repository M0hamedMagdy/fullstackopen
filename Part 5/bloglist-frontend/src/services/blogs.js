import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config;

function setToken(newToken) {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
}

async function getAll() {
  const response = await axios.get(baseUrl, config);
  return response.data;
}

async function create(newBlog) {
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

async function update(updatedBlog) {
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  );
  return response.data;
}

async function remove(id) {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
}

const blogService = { setToken, getAll, create, update, remove };
export default blogService;
