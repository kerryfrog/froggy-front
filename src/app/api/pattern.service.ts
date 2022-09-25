import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
// axios.defaults.withCredentials = true; 

@Injectable({
  providedIn: 'root',
})

export class PatternService {
    async getRecommendPatternList() {
        try {
            //const headers = { 'access-token': token };
            const response = await axios({
                method: 'get',
                url: `${environment.apiUrl}/pattern`,
                responseType: 'json',
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}