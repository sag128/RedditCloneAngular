import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginRequest} from '../login/login-request.payload'
import { AuthService } from '../shared/auth.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import {  GoogleLoginProvider } from "angularx-social-login";



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
  userSocial: SocialUser;


  constructor(private socialAuthService: SocialAuthService,private authService:AuthService, private toastr: ToastrService, private activatedRoute:ActivatedRoute, private router:Router) {

    this.loginRequest =
    {
      username :'',
      password:''
    };

console.log(this.userSocial);


   }

  ngOnInit(): void {

    this.loginForm = new FormGroup
    (
      {
        username: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required)
      }
    );

    this.socialAuthService.authState.subscribe((user) => {
      this.userSocial = user;
      console.log(user);
    });



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


  signIn2()
  {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }


  login()
  {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.loginService(this.loginRequest).subscribe(data=>
      {

          this.isError=false
          this.toastr.success("Login successful","Success",{progressBar:true});
          this.redirectTo('');        

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


  redirectTo(uri:string){
    this.router.navigateByUrl('/list-subreddits', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }



 
}
