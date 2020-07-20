import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginRequest} from '../login/login-request.payload'
import { AuthService } from '../shared/auth.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import {  GoogleLoginProvider } from "angularx-social-login";
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';



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
  success:Boolean;


  constructor(private localStorage:LocalStorageService,private http:HttpClient, private socialAuthService: SocialAuthService,private authService:AuthService, private toastr: ToastrService, private activatedRoute:ActivatedRoute, private router:Router) {

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
          this.success=true;

      }
      console.log(params)
    });


    
  }


  signIn2()
  {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data=>
      {
        this.userSocial=data;
        const token = this.userSocial.idToken;
        this.authService.googleLogin(token).subscribe(data=>
          {

            this.localStorage.store("image",this.userSocial.photoUrl);
            this.isError=false
          this.toastr.success("Login successful","Success",{progressBar:true});
          this.redirectTo('');
          },
          error=>
          {


            this.isError=true;
          throwError(error)
          console.log(error.error.text)
          this.toastr.error("Login failed",error.error.text,{progressBar:true})

          })
      })
}

  // call(tokenArgs:String)
  // {
  //   this.http.post("http://localhost:8080/api/auth/getGoogleJwt/",{"token":tokenArgs},{responseType:"text"}).subscribe(data=>
  //   {
  //     console.log(data)
  //   },

  //   error=>
  //   {
  //     console.log(error);
      
  //   })
  // }


  login()
  {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.loginService(this.loginRequest).subscribe(data=>
      {

          this.isError=false
          this.toastr.success("Login successful","Success",{progressBar:true});
          this.redirectTo('');
          this.localStorage.store("image","https://www.redditstatic.com/avatars/avatar_default_08_D4E815.png")        

      }
      ,
      error => 
        {
          console.log(error.error.text)
          this.toastr.error("Login failed",error.error.text,{progressBar:true})
        })
  }


  redirectTo(uri:string){
    this.router.navigateByUrl('/list-subreddits', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }



 
}
