import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';
import { Router } from '@angular/router';

const { Keyboard, Camera } = Plugins;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  logIn: boolean = true;
  handle: string;
  signInForm: FormGroup;
  newAccountForm: FormGroup;
  signInErrors = [];
  createAccountErrors = [];
  profilePicture;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      handle: new FormControl('', { validators: Validators.compose([Validators.required]), updateOn: 'blur' }),
      password: new FormControl('', { validators: Validators.compose([Validators.required]), updateOn: 'change' }),
    });
    this.newAccountForm = this.fb.group({
      firstName: new FormControl('', { validators: Validators.compose([Validators.required]), updateOn: 'blur' }),
      lastName: new FormControl('', { validators: Validators.compose([Validators.required]), updateOn: 'blur' }),
      newHandle: new FormControl('', { validators: Validators.compose([Validators.required]), updateOn: 'blur' }),
      newPassword: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(8)]), updateOn: 'change' }),
    });
  }

  signIn() {
    this.signInErrors = [];
    this.signInErrors = this.checkForErrors(this.signInForm)

    if (!this.signInErrors.length && this.signInForm.valid) {
      // TODO: handle sign in form here
      this.router.navigate(['app/feed'])
    }
  }

  createAccount() {
    this.createAccountErrors = [];
    this.createAccountErrors = this.checkForErrors(this.newAccountForm);

    if (!this.createAccountErrors.length && this.newAccountForm.valid) {
      // TODO: handle new account form here
      this.router.navigate(['app/feed'])
    }
  }
  scroll() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  checkForErrors(form) {
    let rawErrors = [];
    let errors = [];
    Object.keys(form.controls).forEach(key => {

      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          rawErrors.push(keyError)
        });
        rawErrors.forEach((error) => {
          switch (error) {
            case "email":
              errors.push('Please Enter a Valid Email Address');
              break;
            case "required":
              errors.push('Please Fill Out All Required Fields');
              break;
            case "minlength":
              errors.push('Password must be 8 or more characters');
              break;
          }
        })
      }
    });
    return _.uniq(errors);
  }

  hideKeyboard() {
    Keyboard.hide();
  }

  async retrieveProfilePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    this.profilePicture = image.webPath;
  }

  keyDownFunction(event, eventType) {
    if (event.keyCode === 13) {
      if (eventType === 1) {
        this.hideKeyboard();
        this.signIn();
      }
      if (eventType === 2) {
        this.hideKeyboard();
        this.createAccount();
      }
    }
  }

}
