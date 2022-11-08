import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  async changeNickname(data) {
    try {
      const response = await axios({
        method: "put",
        url: `${environment.apiUrl}/profile/nickname`,
        data,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async changeProfile(data) {
    try {
      const response = await axios({
        method: "put",
        url: `${environment.apiUrl}/profile`,
        data,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
