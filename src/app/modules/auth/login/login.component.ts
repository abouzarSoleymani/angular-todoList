import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnInit {
  signinForm: FormGroup;
private formSubmitAttempt: boolean;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() { }

  isFieldInvalid(field: string) {
    return (
      (!this.signinForm.get(field).valid && this.signinForm.get(field).touched) ||
      (this.signinForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  loginUser() {
    if (this.signinForm.valid) {
      this.authService.signIn(this.signinForm.value);
    }
    this.formSubmitAttempt = true;
  }
}
