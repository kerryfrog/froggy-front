import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  async uploadSingleImage(data) {
    try {
      console.log("imageservice", data);

      const formData = new FormData();
      // const { imageData } = data;

      formData.append("image", data);

      // imageData.forEach((image) => {
      //   formData.append("image", image.fileBlob, image.fileName);
      // });

      const response = await axios({
        method: "post",
        url: `${environment.apiUrl}/image/single`,
        data: formData,
        responseType: "json",
      });
      console.log("response", response);

      return response;
    } catch (error) {
      return error.response;
    }
  }
}
