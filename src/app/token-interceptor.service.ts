import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from './auth/shared/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  isTokenRefreshing: Boolean=false;;
  refreshTokenSubject: BehaviorSubject<any>= new BehaviorSubject(null);

  constructor(private authService:AuthService) {


   }



  addToken(req: HttpRequest<any>, jwtToken: any) {
  
    return req.clone({
        headers: req.headers.set('Authorization','Bearer '+jwtToken) // set for headers for get and post requests
    });
  
  }

   intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>
   {
    if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
      return next.handle(req);
  }
     const jwtToken = this.authService.getJwtToken();

     if(jwtToken)  //if jwt exists in localstorage
     {
      return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse
            && error.status === 403) {                          // if jwt exists but is expired then it throws a 403
            return this.handleAuthErrors(req, next);
        } else {
            return throwError(error);
        }
      }));
    }
return next.handle(req);
   }



  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  // for handling http errors
    
    if(!this.isTokenRefreshing)  // if refreshtoken exists
    {
      this.isTokenRefreshing=true;
      this.refreshTokenSubject.next(null);


      return this.authService.refreshToken().pipe(         // call refreshtoken from auth service to get new jwt 
        switchMap((refreshTokenResponse:LoginResponse) => {
          this.isTokenRefreshing=false;
          this.refreshTokenSubject.next(
            refreshTokenResponse.authenticationToken);      // set subject to authentication token
            console.log(this.refreshTokenSubject);
            


            return next.handle(this.addToken(req,refreshTokenResponse.authenticationToken));    //add token to headers
          }))

    }

    else
    {
      return this.refreshTokenSubject.pipe(
        filter(result=>result !== null),
        take(1),
        switchMap(res=>
          {

          
          return next.handle(this.addToken(req,this.authService.getJwtToken())) 
          })

      );
    }

  }
    
  
  }





