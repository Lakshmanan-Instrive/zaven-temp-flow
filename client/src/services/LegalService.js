import http from "../http-common";

class LegalService {
  endpoint(path) {
    return `/legal-services${path}`;
  }

  getLegalServices() {
    return http.get(this.endpoint("/"));
  }

  createLegalService(data) {
    return http.post(this.endpoint("/"), data);
  }

  updateLegalServiceStatus(id, data) {
    return http.patch(this.endpoint(`/${id}`), data);
  }

  getLegalServiceProfile() {
    return http.get(this.endpoint("/profile"));
  }

  getLegalServiceUsers() {
    return http.get(this.endpoint("/user-list"));
  }

  inviteLegalServiceUser(data) {
    return http.post(this.endpoint("/invite"), data);
  }

  updateLegalServiceUserStatus(data) {
    return http.patch(this.endpoint("/user/status-update"), data);
  }
}

export default new LegalService();
