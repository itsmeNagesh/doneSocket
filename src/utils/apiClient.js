import axios from 'axios';

// Set the base URL dynamically
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://api.apexiq.ai';

// ✅ Ensure Axios includes cookies in requests
axios.defaults.withCredentials = true;

// Function to get a specific cookie by name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? match[2] : null;
};

const createHeader = (_URL, options = {}) => {
  let header = {
    Accept: '*/*', // ✅ Accept all response types
    'X-CSRFToken': getCookie('csrftoken'),
    'Session-ID': getCookie('sessionid'),
    Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
  };

  options = { ...options, headers: header };
  return { URL: _URL, options: options };
};

const POST = (_URL, data = {}, _options) => {
  try {
    let { URL, options } = createHeader(_URL, _options);
    return axios.post(URL, data, options);
  } catch (error) {
    return Promise.reject(error);
  }
};

const GET = (_URL, _options) => {
  let { URL, options } = createHeader(_URL, _options);
  return axios.get(URL, options);
};

const PATCH = (_URL, data = null, _options) => {
  let { URL, options } = createHeader(_URL, _options);
  return axios.patch(URL, data, options);
};

const DELETE = (_URL, _options) => {
  let { URL, options } = createHeader(_URL, _options);
  return axios.delete(URL, options);
};

export { POST, GET, PATCH, DELETE };
