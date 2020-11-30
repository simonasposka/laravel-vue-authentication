import api from "./api";

export default {
  createSession() {
    return api.get('http://localhost/sanctum/csrf-cookie');
  },

  login(params) {
    return api.post('http://localhost/api/login', params);
  },

  logout() {
    return api.delete('http://localhost/api/logout');
  },

  getPosts() {
    return api.get(`http://localhost/api/posts`);
  },
};
