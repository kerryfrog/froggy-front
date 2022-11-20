import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import axios from "axios";
// axios.defaults.withCredentials = true;

@Injectable({
  providedIn: "root",
})
export class PatternService {
  async getRandomPatternList() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getRecommendPatternList(page) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/recommend/${page}`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getTmpPatternList() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/recommend/doll`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getRecommendByDifficulty() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/recommend/difficulty`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getRecommendByCrochet() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/recommend/crochet`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getRecommendByKnitting() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/recommend/knitting`,
        responseType: "json",
      });
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
  async getPatternReview(patternId) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/${patternId}/reviews`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getPatternReviewByUser() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/reviews`,
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
        url: `${environment.apiUrl}/pattern/liked/list`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getPatternAttributeList() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/pattern/attribute/list`,
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
  async postPatternReview(paramJson) {
    try {
      const { data, patternId, images } = paramJson;
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image.fileBlob, image.fileName);
        });
      }
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/pattern/${patternId}/reviews/`,
        data: formData,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async deletePatternReview(paramJson) {
    try {
      const { patternId } = paramJson;
      const response = await axios({
        method: "delete",
        url: `${environment.apiUrl}/pattern/${patternId}/reviews/`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
