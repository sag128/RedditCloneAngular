import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginRequest} from '../login/login-request.payload'
import { AuthService } from '../shared/auth.service';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  isError:Boolean;
  loginRequest:LoginRequest;

  constructor(private authService:AuthService) {

    this.loginRequest =
    {
      username :'',
      password:''
    };

   }

  ngOnInit(): void {

    this.loginForm = new FormGroup
    (
      {
        username: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required)
      }
    );


  }


  login()
  {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.loginService(this.loginRequest).subscribe(data=>
      {

          this.isError=false
        
        

      }
      ,
      error => 
        {
          this.isError=true;
          throwError(error)
        })
  }

}
