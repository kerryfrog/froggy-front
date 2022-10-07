import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import axios from "axios";
// axios.defaults.withCredentials = true;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  async postSignIn(data) {
    console.log("post login form", data);
    try {
      const headers = {
        'Accept': "application/json",
        'Content-Type': 'application/json',
      }
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/auth/login`,
        headers,
        data,
        responseType: "json",
      });

      console.log("response from server" , response);
      
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async postSignUp(data) {
    console.log("post signup form", data);
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
}
