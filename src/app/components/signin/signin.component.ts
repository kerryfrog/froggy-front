import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, ModalController } from "@ionic/angular";
import { AuthService } from "src/app/api/auth/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  public ionicForm: FormGroup;
  public isSubmitted;

  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public authService: AuthService,
    public storage: Storage,
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: ["", [Validators.required, Validators.minLength(2)]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      await this.authService.postSignIn(this.ionicForm.value);
      console.log(this.ionicForm.value);
    }
  }

  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }
}
