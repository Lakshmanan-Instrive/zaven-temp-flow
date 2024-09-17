import http from "../http-common";

class AuthService {
  endpoint(path) {
    return `/auth/${path}`;
  }

  login(data) {
    return http.post(this.endpoint("login"), data);
  }

  verify(data) {
    return http.post(this.endpoint("verify"), data);
  }

  logout() {
    return http.post(this.endpoint("logout"));
  }

  invite(data) {
    return http.post(this.endpoint("invite"), data);
  }

  changePassword(data) {
    return http.post(this.endpoint("change-password"), data);
  }
}

export default new AuthService();
