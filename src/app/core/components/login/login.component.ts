import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from 'Instagram';
import { RealDataService, LocalSettingsService } from 'src/app/shared/services';


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
  errorMessage: string = null;
  photoUrl: string = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private af: AngularFireAuth,
    private realData: RealDataService,
    private settings: LocalSettingsService,
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

    if(!this.signInErrors.length && this.signInForm.valid) {
      this.af.auth.signInWithEmailAndPassword(`${this.signInForm.value.handle}@340instagram.com`, this.signInForm.value.password).then((user) => {
        let userId = user.user.uid;
        this.settings.setUserId(userId);
      }).catch((e: any) => {
        console.log(e.message)
        this.errorMessage = e.message;
      });
    }
  }

  async createAccount() {
    this.createAccountErrors = [];
    this.createAccountErrors = this.checkForErrors(this.newAccountForm);

    if(!this.createAccountErrors.length && this.newAccountForm.valid) {
      this.af.auth.createUserWithEmailAndPassword(`${this.newAccountForm.value.newHandle}@340instagram.com`, this.newAccountForm.value.newPassword).then((user) => {
        let newUser: User = {
          id: user.user.uid,
          username: this.newAccountForm.value.firstName + ' ' + this.newAccountForm.value.lastName,
          handle: this.newAccountForm.value.newHandle,
          following: [],
          followers: []
        } 
        this.photoUrl && (newUser = {...newUser, photoUrl: this.photoUrl, followers: [], following: []})
        this.realData.upsertItem('user', newUser)
      }).catch((e: any) => {
        this.errorMessage = e.message;
      });
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

  async handleFileInput(files: FileList) {
      let fileToUpload = files.item(0);
      this.settings.updateProfilePic(fileToUpload).subscribe((val) => {
        val && (this.photoUrl = val)
      })
  }

  keyDownFunction(event, eventType) {
    if (event.keyCode === 13) {
      if (eventType === 1) {
        this.signIn();
      }
      if (eventType === 2) {
        this.createAccount();
      }
    }
  }

}
