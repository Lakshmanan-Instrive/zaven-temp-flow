import http from "../http-common";

class UserService {
  endpoint(path) {
    return `/user${path}`;
  }

  userChangePassword(data) {
    return http.patch(this.endpoint("/change-password"), data);
  }
}

export default new UserService();
