import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginRequest} from '../login/login-request.payload'
import { AuthService } from '../shared/auth.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  isError:Boolean;
  loginRequest:LoginRequest;
  registerSuccessMessage: string;

  constructor(private authService:AuthService, private toastr: ToastrService, private activatedRoute:ActivatedRoute, private router:Router) {

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


    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success("Signup successful","Success",{progressBar:true});
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
      }
      console.log(params)
    });
  }


  login()
  {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.loginService(this.loginRequest).subscribe(data=>
      {

          this.isError=false
          this.toastr.success("Login successful","Success",{progressBar:true});
          this.router.navigateByUrl('');
        

      }
      ,
      error => 
        {
          this.isError=true;
          throwError(error)
          console.log("Error")
          this.toastr.error("Login failed","Error",{progressBar:true})
        })
  }

}
