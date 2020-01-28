import { Component, OnInit } from '@angular/core';
import {Router}  from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {MessageService} from '../../../core/services/message.service';
import {MatDialogRef} from '@angular/material';
import {
  PasswordValidator,
  ParentErrorStateMatcher,
} from '../../../shared/validators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  matching_passwords_group: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  user_validation_messages = {
    'name': [
      { type: 'required', message: 'name is required' },
      { type: 'minlength', message: 'name must be at least 5 characters long' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'role': [
      { type: 'required', message: 'role is required' },
    ],
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}


  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.signupForm = this.fb.group({
      name: new FormControl(null,
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
        ])
      ),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      role: new FormControl(null, [Validators.required]),
    })
  }

  registerUser() {
    if(this.signupForm.invalid)
      return;
    let signupValue = {
      _id: null,
      name: this.signupForm.get('name').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('matching_passwords').value.password,
      role: this.signupForm.get('role').value
    }
    console.log(signupValue)
    this.authService.signUp(signupValue).subscribe((res) => {
      if (res) {
        console.log(res)
        this.messageService.showErrorMessage('ثبت نام کاربر با موفقیت انجام شد');
        this.signupForm.reset()
        this.router.navigate(['./sign-in']);
      }
    })
  }
}
