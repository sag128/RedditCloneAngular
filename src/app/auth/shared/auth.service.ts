import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequest} from '../signup/signup-request.payload';
import { Observable } from 'rxjs';
import {LoginRequest} from '../login/login-request.payload';
import {LoginResponse} from '../login/login-response.payload';
import {  LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  refreshToken() {   // get new jwt from the refreshtoken generated at the time of login with username


    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
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

  constructor(private http:HttpClient , private localStorage:LocalStorageService) { }


  signupService(signupRequest:SignupRequest):Observable<any>
  {
    return this.http.post('http://localhost:8080/api/auth/signup',signupRequest,{responseType:'text'});
  }

  loginService(loginRequest:LoginRequest) : Observable<boolean>
  {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/login',loginRequest).pipe(map(data =>
    {
      this.localStorage.store('authenticationToken',data.authenticationToken);
      this.localStorage.store('expiresAt',data.expiresAt);
      this.localStorage.store('refreshToken',data.refreshToken);
      this.localStorage.store('username',data.username);

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



}
