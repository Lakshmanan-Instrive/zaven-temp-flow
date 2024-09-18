import http from "../http-common";

class RefreshTokenService {
  endpoint(path) {
    return `/refresh-token${path}`;
  }

  refresh(data) {
    return http.post(this.endpoint("/"), data);
  }
}

export default new RefreshTokenService();
