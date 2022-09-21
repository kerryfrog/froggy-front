import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public ionicForm: FormGroup;
  public isSubmitted;

  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nickname: ['', [Validators.required, Validators.minLength(2)]],
      id: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      confirm: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }
  
  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
}
  
  goBack() {
    this.modalController.dismiss({
      dismissed: false,
    });
  }  
}
