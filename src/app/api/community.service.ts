import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Post } from "../models/server-request";

import axios from "axios";


@Injectable({
    providedIn: "root",
})
export class CommunityService {
    async postNewPost(data) {
    try {
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/community/write`,
        data,
        responseType: "json",
      });
      return response;
    } catch (error) {
      return error.response;
    }
    }
 
}
