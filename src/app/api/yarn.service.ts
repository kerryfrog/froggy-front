import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import axios from "axios";
// axios.defaults.withCredentials = true;

@Injectable({
  providedIn: "root",
})
export class YarnService {
  async getRecommendYarnList() {
    try {
      //const headers = { 'access-token': token };
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/yarn`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getYarnSearchList(keyword) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/yarn/search`,
        params: keyword,
        responseType: "json",
      });
      console.log(response);
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getFavoriteYarnList() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/yarn/liked/list`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getYarnDetail(yarnId) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/yarn/${yarnId}`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async enrollFavoriteYarn(data) {
    try {
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/yarn`,
        responseType: "json",
        data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async postYarnLike(yarnId) {
    try {
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/yarn/liked/${yarnId}`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getYarnReview(yarnId) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/yarn/${yarnId}/reviews`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getYarnReviewByUser() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/yarn/reviews`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getYarnAttributeList() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/yarn/attribute/list`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async postYarnReview(paramJson) {
    try {
      const { data, yarnId } = paramJson;
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/yarn/${yarnId}/reviews/`,
        data,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async deleteYarnReview(paramJson) {
    try {
      const { yarnId } = paramJson;
      const response = await axios({
        method: "delete",
        url: `${environment.apiUrl}/yarn/${yarnId}/reviews/`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
