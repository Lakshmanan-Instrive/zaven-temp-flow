import http from "../http-common";

class CorporateService {
  endpoint(path) {
    return `/corporate${path}`;
  }

  getCorporate({ page, limit }) {
    return http.get(
      this.endpoint(`?${new URLSearchParams({ page: page + 1, limit })}`)
    );
  }

  createCorporate(data) {
    return http.post(this.endpoint("/"), data);
  }

  updateCorporateStatus(data) {
    const { id, ...rest } = data;
    return http.patch(this.endpoint(`/${id}`), rest);
  }

  getCorporateProfile() {
    return http.get(this.endpoint("/profile"));
  }

  getCorporateUsers() {
    return http.get(this.endpoint("/user-list"));
  }

  inviteCorporateUser(data) {
    return http.post(this.endpoint("/invite"), data);
  }

  updateCorporateUserStatus(data) {
    return http.patch(this.endpoint("/user/status-update"), data);
  }
}

export default new CorporateService();
