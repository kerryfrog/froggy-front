import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import axios from "axios";
axios.defaults.withCredentials = true;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  async postSignIn(data) {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/auth/login`,
        headers,
        data,
        responseType: "json",
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async postSignUp(data) {
    try {
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/auth/join`,
        data,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async logout() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/auth/logout`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
