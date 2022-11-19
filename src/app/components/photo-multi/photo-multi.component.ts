import {
  ModalController,
  NavController,
  AlertController,
} from "@ionic/angular";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from "@angular/core";
// import { ImagePreviewComponent } from "src/app/common/modal/image-preview/image-preview.component";

// const { Camera, Filesystem, Device } = Plugins;

@Component({
  selector: "app-photo-multi",
  templateUrl: "./photo-multi.component.html",
  styleUrls: ["./photo-multi.component.scss"],
})
export class PhotoMultiComponent implements OnInit {
  @Input() imgSrcList;
  @Output() imgSrcListChange = new EventEmitter();
  @Input() limitCnt;
  @Input() limitText;
  @Input() isShowFileNames;
  @ViewChild("fileInput", { static: false }) fileInput: any;

  public Images = [];
  public imagesForDisplay = [];

  public userPlatform;

  constructor(
    public modalController: ModalController,
    public changeDetectorRef: ChangeDetectorRef,
    public navController: NavController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    // this.setPlatform();
    this.setImagesForDisplay();
    this.setDefault();
  }

  setImagesForDisplay() {
    console.log(this.imgSrcList);
    if (this.imgSrcList.length > 0) {
      this.imgSrcList.forEach((imgSrc) => {
        this.imagesForDisplay.push({
          image: imgSrc,
        });
      });
    }
    this.changeDetectorRef.detectChanges();
  }

  setDefault() {
    if (!this.limitCnt) this.limitCnt = 10;
    if (!this.limitText)
      this.limitText = "10개 이상의 사진을 첨부할 수 없습니다.";
    if (!this.isShowFileNames) this.isShowFileNames = false;
  }

  // 이미지 버튼 클릭 핸들러 함수
  async openUserPhotoLibrary(): Promise<void> {
    this.fileInput.nativeElement.click();
    const fileList = this.fileInput.nativeElement.files;
    await this.getImageWeb(fileList);

    this.changeDetectorRef.detectChanges();
  }

  // async getImageMob() {
  //   const imageData = {
  //     fileName: undefined,
  //     fileFormat: undefined,
  //     fileBlob: undefined,
  //   };
  //   const displayImageData = {
  //     imageName: undefined,
  //     image: undefined,
  //   };
  //   const image = await Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType: CameraResultType.Uri,
  //     promptLabelHeader: "첨부 파일",
  //     promptLabelPhoto: "사진 가져오기",
  //     promptLabelPicture: "사진 촬영",
  //     promptLabelCancel: "취소",
  //   });
  //   const imagePath = this.userPlatform === "web" ? image.webPath : image.path;
  //   const splitedImagePath = imagePath.split("/");
  //   const imageName = imagePath.split("/")[splitedImagePath.length - 1];
  //   const imageBase64 = await Filesystem.readFile({ path: imagePath });
  //   const blob = await this.b64toBlob(
  //     imageBase64.data,
  //     `image/${image.format}`
  //   );
  //   imageData.fileName = imageName;
  //   imageData.fileFormat = image.format;
  //   imageData.fileBlob = blob;
  //   displayImageData.imageName = imageName;
  //   displayImageData.image = `data:image/${image.format};base64,${imageBase64.data}`;

  //   await this.pushImages(imageData, displayImageData);
  // }

  async getImageWeb(files) {
    const fileExtension = /(.*?)\.(webp)$/;

    for (let i = 0; i < files.length; i++) {
      const fileInfo = files.item(i);
      const imageName = fileInfo.name;
      const imageType = fileInfo.type;
      const extension = imageType.split("/")[1];
      if (files.item(i).name.match(fileExtension)) {
        const alert = await this.alertController.create({
          header: "",
          subHeader: "",
          message: ".webp 형식의 이미지 파일은 업로드 할 수 없습니다.",
          buttons: [{ text: "확인" }],
        });
        await alert.present();
        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(files.item(i));

      reader.onload = () => {
        const imageData = {
          fileName: undefined,
          fileFormat: undefined,
          fileBlob: undefined,
        };
        const displayImageData = {
          imageName: undefined,
          image: undefined,
        };
        displayImageData.imageName = imageName;
        displayImageData.image = reader.result;
        imageData.fileBlob = fileInfo;
        imageData.fileFormat = extension;
        imageData.fileName = imageName;

        this.pushImages(imageData, displayImageData);
      };
    }
    this.fileInput.nativeElement.value = "";
    this.changeDetectorRef.detectChanges();
  }

  async pushImages(imageData, displayImageData) {
    this.Images.push(imageData);
    this.imagesForDisplay.push(displayImageData);
    this.emitImgSrcChange();
    this.changeDetectorRef.detectChanges();
  }

  // // 이미지 미리보기 모달을 여는 함수
  // // IOS 미리보기 기능 block
  // async openImagePreviewModal(targetIndex) {
  //   console.log(this.userPlatform);
  //   if (this.userPlatform !== "ios") {
  //     const modal = await this.modalController.create({
  //       component: ImagePreviewComponent,
  //       componentProps: {
  //         images: this.imagesForDisplay,
  //         initialIndex: targetIndex,
  //       },
  //       cssClass: "modal-image-preview",
  //     });
  //     await modal.present();
  //   }
  // }

  // 이미지 리스트에서 이미지를 삭제하는 함수
  async deleteImage(targetImageIndex): Promise<void> {
    await this.alertController.create({
      header: "⚠️",
      subHeader: "첨부파일을 삭제하시겠습니까?",
      message: "",
      buttons: [
        {
          text: "취소",
          handler: () => {},
        },
        {
          text: "확인",
          handler: () => {
            const updateImages = [...this.Images];
            const updateImagesForDisplay = [...this.imagesForDisplay];

            updateImages.splice(targetImageIndex, 1);
            updateImagesForDisplay.splice(targetImageIndex, 1);

            this.Images = updateImages;
            this.imagesForDisplay = updateImagesForDisplay;

            this.emitImgSrcChange();
            this.changeDetectorRef.detectChanges();
          },
        },
      ],
    });
  }
  emitImgSrcChange() {
    this.imgSrcListChange.emit(this.Images);
  }

  // async setPlatform() {
  //   const info = await Device.getInfo();
  //   this.userPlatform = info.platform;
  //   this.changeDetectorRef.detectChanges();
  // }

  // base64를 blob으로 변경하는 함수
  b64toBlob = async (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
  };
}
