import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Post } from "../models/server-request";

import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class CommunityService {
  async saveNewPost(data) {
    try {
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/community/posts`,
        data,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async saveNewComment(data) {
    try {
      const { postId } = data;
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/community/posts/${postId}/comments`,
        data,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getMainPosts() {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/community/main`,
        responseType: "json",
      });
      console.log("response of getMainPosts", response);

      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getPosts(category) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/community/posts/${category}`,
        responseType: "json",
      });
      console.log("response of specific posts of category", response);

      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getPostDetail(postId) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/community/posts/${postId}`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async getComments(postId) {
    try {
      const response = await axios({
        method: "get",
        url: `${environment.apiUrl}/community/posts/${postId}/comments`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async deletePost(postId) {
    try {
      const response = await axios({
        method: "delete",
        url: `${environment.apiUrl}/community/posts/${postId}`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async deleteComment(postId, commentId) {
    try {
      const response = await axios({
        method: "delete",
        url: `${environment.apiUrl}/community/posts/${postId}/comments/${commentId}`,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
