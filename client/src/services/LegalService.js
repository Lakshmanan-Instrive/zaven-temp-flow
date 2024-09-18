import http from "../http-common";

class LegalService {
  endpoint(path) {
    return `/legal-services${path}`;
  }

  getLegalServices({ page, limit }) {
    return http.get(
      this.endpoint(`?${new URLSearchParams({ page: page + 1, limit })}`)
    );
  }

  createLegalService(data) {
    return http.post(this.endpoint("/"), data);
  }

  updateLegalServiceStatus(data) {
    const { id, ...rest } = data;
    return http.patch(this.endpoint(`/${id}`), rest);
  }

  getLegalServiceProfile() {
    return http.get(this.endpoint("/profile"));
  }

  getLegalServiceUsers({ page, limit }) {
    return http.get(
      this.endpoint(
        `/user-list?${new URLSearchParams({ page: page + 1, limit })}`
      )
    );
  }

  inviteLegalServiceUser(data) {
    return http.post(this.endpoint("/invite"), data);
  }

  updateLegalServiceUserStatus(data) {
    return http.patch(this.endpoint("/user/status-update"), data);
  }
}

export default new LegalService();
