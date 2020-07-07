import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { CommentRequestService } from 'src/app/comment/comment-request.service';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileGuardService implements CanActivate{

  constructor(private postService:PostService,private commentService:CommentRequestService,private activateRoute:ActivatedRoute,private authService:AuthService,private router:Router) { }

  name:string = this.activateRoute.snapshot.params.username;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


console.log(this.name,this.authService.getUserName());


 

    console.log(this.name,this.authService.getUserName());
   
    this.router.navigateByUrl('/userProfile/'+this.authService.getUserName())
 return false;
  }

  //   const isAuthenticated = this.authService.isLoggedIn();
  //   if (isAuthenticated) {
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/login');
  //   }
  //   return true;
  // }
    }




