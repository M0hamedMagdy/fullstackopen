import axios from "axios";

const baseUrl = "/api/login";

async function login(cradentioals) {
  const response = await axios.post(baseUrl, cradentioals);
  return response.data;
}

const loginService = {
  login,
};

export default loginService;
