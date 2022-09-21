import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
// axios.defaults.withCredentials = true; 

@Injectable({
    providedIn: 'root',
})
export class DataService { 
    async postPatternData(data) {
        console.log("post login form", data);
        try {
            const response = await axios({
                method: 'post',
                url: `${environment.apiUrl}/join`,
                data,
                responseType: 'json',
            });
            return response;
        } catch (error) {
        return error.response;
        }
    }

}