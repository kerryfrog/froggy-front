import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, ModalController } from "@ionic/angular";
import { AuthService } from "src/app/api/auth/auth.service";
import { UserService } from "src/app/services/user.service";
import { SignupComponent } from "src/app/components/signup/signup.component";



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
    public userService:UserService,
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
      const signInResult = await this.authService.postSignIn(this.ionicForm.value);
      console.log("signInResult" , signInResult);
        
      if (signInResult.data.status === 'Y') {
        await this.userService.saveUser(signInResult.data.user);        
        this.goBackWithSignIn()
      }
      console.log(this.ionicForm.value);
    }
  }


  async goSignUp() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: "modal-fullscreen",
    });
    await modal.present();
  }


  goBack() {
    console.log("go back");
    
    this.modalController.dismiss({
      dismissed: false,
    });
  }

  goBackWithSignIn() {
    this.modalController.dismiss({
      isSignedIn: true,
    });
  }


}
