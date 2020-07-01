import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequest} from '../signup/signup-request.payload';
import { Observable } from 'rxjs';
import {LoginRequest} from '../login/login-request.payload';
import {LoginResponse} from '../login/login-response.payload';
import {  LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

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



}
