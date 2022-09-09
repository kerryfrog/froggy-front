import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
// axios.defaults.withCredentials = true; 

@Injectable({
  providedIn: 'root',
})

export class DataService {
    async getYarnDataFromRaverly(id) {
        try {
            let result;
            const BASE_URI = "https://api.ravelry.com";
            const headers = new Headers(); // 인증
            const endpoint = `${BASE_URI}/yarns/${id}.json`;
            headers.append(
                "Authorization",
                "Basic " +
                btoa(
                    "read-ea6b8e0a978e097b8badec466c71a60b" +
                    ":" +
                    "nKTdyxY5v3mF3TDb8hkQHGhHwHNQL7lbJtU8Dz15"
                )
            );
            await fetch(endpoint, { method: "GET", headers: headers })
                .then((res) => res.json())
                .then((data) => {
                    result = data; 
                })
            return result;
        }
        catch (error) {
            return error.response;
        }
    }
    async postYarnData(data) {
        
        console.log("post Yarn Data", data);
        try {
            const response = await axios({
                method: 'post',
                url: `${environment.apiUrl}/dbTest`,
                data,
                responseType: 'json',
            });
            return response;
        } catch (error) {
        return error.response;
        }
    }

}