import { Injectable, EventEmitter, Output } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequest} from '../signup/signup-request.payload';
import { Observable } from 'rxjs';
import {LoginRequest} from '../login/login-request.payload';
import {LoginResponse} from '../login/login-response.payload';
import {  LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler/src/ml_parser/lexer';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }


  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshToken() {   // get new jwt from the refreshtoken generated at the time of login with username


    return this.http.post<LoginResponse>('https://redditcloneapi.herokuapp.com/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }




  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  constructor(private http:HttpClient , private localStorage:LocalStorageService,private toaster:ToastrService) { }


  signupService(signupRequest:SignupRequest):Observable<any>
  {
    return this.http.post('https://redditcloneapi.herokuapp.com/api/auth/signup/',signupRequest,{responseType:'text'});
  }

  loginService(loginRequest:LoginRequest) : Observable<boolean>
  {
    return this.http.post<LoginResponse>('https://redditcloneapi.herokuapp.com/api/auth/login/',loginRequest).pipe(map(data =>
    {
      this.localStorage.store('authenticationToken',data.authenticationToken);
      this.localStorage.store('expiresAt',data.expiresAt);
      this.localStorage.store('refreshToken',data.refreshToken);
      this.localStorage.store('username',data.username);


      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    }
    
    ))
    
  
  }


  googleLogin(token:String) : Observable<boolean>
  {
    return this.http.post<LoginResponse>("https://redditcloneapi.herokuapp.com/api/auth/getGoogleJwt/",{"token":token}).pipe(map(data =>
    {
      this.localStorage.store('authenticationToken',data.authenticationToken);
      this.localStorage.store('expiresAt',data.expiresAt);
      this.localStorage.store('refreshToken',data.refreshToken);
      this.localStorage.store('username',data.username);


      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    }
    
    ))
    
  
  }



  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn():Boolean
  {
    console.log(this.getUserName());
    return this.getJwtToken() != null;
    
  }


  logout() {
    console.log(this.getRefreshToken());
    
    console.log(this.getUserName());
    this.refreshTokenPayload={
      refreshToken:this.getRefreshToken(),
      username:this.getUserName()
    }
    
   
    this.http.post('https://redditcloneapi.herokuapp.com/api/auth/logout',this.refreshTokenPayload,{responseType:'text'}).subscribe(
      data=>
      {
        console.log(data);
        this.toaster.success("Logout Successful","Success",{progressBar:true});
        console.log(this.refreshTokenPayload);
        
      },
      error=>
      {

        console.log(this.refreshTokenPayload);

      console.log(error);
      this.toaster.error("Logout unsuccessful","Error",{progressBar:true});
      }
      
    )

    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('refreshToken');

  }

}
