import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
// axios.defaults.withCredentials = true; 

@Injectable({
  providedIn: 'root',
})

export class YarnService {
    async getRecommendYarnList() {
        try {
            //const headers = { 'access-token': token };
            const response = await axios({
                method: 'get',
                url: `${environment.apiUrl}/yarn`,
                responseType: 'json',
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    async enrollFavoriteYarn(data) {
        try {
            const response = await axios({
                method: 'post',
                url: `${environment.apiUrl}/yarn`,
                responseType: 'json',
                data,
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}