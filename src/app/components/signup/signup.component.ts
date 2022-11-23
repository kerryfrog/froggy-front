import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";
import { AuthService } from "src/app/api/auth/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  public ionicForm: FormGroup;
  public isSubmitted;

  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public authService: AuthService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: ["", [Validators.required, Validators.minLength(2)]],
      nickname: ["", [Validators.required, Validators.minLength(2)]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(200),
        ],
      ],
      confirm: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(200),
        ],
      ],
      code: ["", []],
    });
  }
  async ionViewDidEnter() {}

  get errorControl() {
    return this.ionicForm.controls;
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      const signUpResult = await this.authService.postSignUp(
        this.ionicForm.value
      );
      console.log(signUpResult);
      if (signUpResult.data.status === "Y") {
        const alert = await this.alertController.create({
          header: "회원가입 성공",
          subHeader: "",
          message: "로그인 해주세요!",
          buttons: [{ text: "확인" }],
        });
        await alert.present();
        this.goBack();
        return;
      }
    }
  }

  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }
}
