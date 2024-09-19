import http from "../http-common";

class LegalService {
  endpoint(path) {
    return `/legal-services${path}`;
  }

  getLegalServices({ page, limit, search, filter, sort }) {
    if (!search) search = "";
    if (!filter) filter = "";
    if (!sort) sort = "";
    else sort = JSON.stringify(sort);
    console.log("filter", filter);
    return http.get(
      this.endpoint(
        `?${new URLSearchParams({
          page: page + 1,
          limit,
          search,
          ...filter,
          sort,
        })}`
      )
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

  getLegalServiceUsers({ page, limit, search, filter, sort }) {
    if (!search) search = "";
    if (!filter) filter = "";
    if (!sort) sort = "";
    else sort = JSON.stringify(sort);
    return http.get(
      this.endpoint(
        `/user-list?${new URLSearchParams({
          page: page + 1,
          limit,
          search,
          ...filter,
          sort,
        })}`
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
