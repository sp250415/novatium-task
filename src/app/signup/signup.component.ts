import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(public loginService: LoginService, private _formBuilder: FormBuilder, private router: Router) {
    this.signUpForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.loginService.postSignUp(this.signUpForm.value).subscribe((data: any) => {
      if (data.success) {
        alert('User Created!!');
        this.router.navigate(['/login']);
      } else {
        alert('Something went wrong!!')
      }
    })
  }
}
