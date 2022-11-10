import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import axios from "axios";
// axios.defaults.withCredentials = true;

@Injectable({
  providedIn: "root",
})
export class PatternService {
  async getRecommendPatternList() {
    try {
      //const headers = { 'access-token': token };
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern`,
        responseType: "json",
      });
      console.log("response", response);

      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getPatternSearchList(keyword) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/search`,
        params: keyword,
        responseType: "json",
      });
      console.log(response);
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getPatternDetail(patternId) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/${patternId}`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getAiPattern() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/flask/test`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getFavoritePatternList() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/favorite-list`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async postPatternLike(patternId) {
    try {
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/pattern/liked/${patternId}`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
