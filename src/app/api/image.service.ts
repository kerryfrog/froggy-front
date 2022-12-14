import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  async uploadSingleImage(data) {
    try {
      const formData = new FormData();
      formData.append("image", data);
      // formData.append("imageName", data.name);
      // imageData.forEach((image) => {
      //   formData.append("image", image.fileBlob, image.fileName);
      // });
      // const response = await axios.post(
      //   `${environment.apiUrl}/image/single`,
      //   formData
      // );
      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/image/single`,
        data: formData,
        responseType: "json",
      });

      return response;
    } catch (error) {
      return error.response;
    }
  }
}
