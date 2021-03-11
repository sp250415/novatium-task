import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  usersList: any;

  constructor(private formBuilder: FormBuilder,private router: Router,private loginService: LoginService,
    ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
  });
}

  get f(){return this.loginForm.controls;}

  ngOnInit(): void {
  }

  submit(){
    console.log(this.loginForm.value)
    this.loginService.postLogin(this.loginForm.value).subscribe((data:any)=>{
      console.log(data)
      if(data.success){
        let user_id = JSON.stringify(data.data._id);
        console.log(data.data._id)
        alert('Login Successful');
        localStorage.setItem('user_id' , user_id)
        this.router.navigate(['/list']);
      }else{
          alert('Username or Password is incorrect');
        }
    })
}
}
