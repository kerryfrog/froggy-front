import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})

export class DataService {
    async getYarnDataFromRaverly(id) {
        try {
            const BASE_URI = "https://api.ravelry.com";
            const headers = new Headers(); // 인증
            const endpoint = `${BASE_URI}/patterns/${id}.json`;
            headers.append(
                "Authorization",
                "Basic " +
                btoa(
                    "read-ea6b8e0a978e097b8badec466c71a60b" +
                    ":" +
                    "nKTdyxY5v3mF3TDb8hkQHGhHwHNQL7lbJtU8Dz15"
                )
            );
            fetch(endpoint, { method: "GET", headers: headers })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    return data;
                })
        }
        catch (error) {
            return error.response;
        }
    }
    async postYarnData(data) {
        try {
            const response = await axios({
                method: 'post',
                url: `${environment.apiUrl}/dbTest/`,
                data,
                responseType: 'json'
            }); 
      return response;
        } catch (error) {
        return error.response;
        }
    }

}