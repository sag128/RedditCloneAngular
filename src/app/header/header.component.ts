import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:Boolean;
  username:string; 
  faUser = faUser;
  image:String;


  constructor(private localstorage:LocalStorageService, private authService:AuthService,private router:Router) { }
  
  


  ngOnInit(): void {
  
  this.authService.loggedIn.subscribe((data:boolean)=>{this.isLoggedIn= data})
  this.authService.username.subscribe((data:string)=>{this.username= data})
  
 this.isLoggedIn= this.authService.isLoggedIn();
 this.username = this.authService.getUserName();
 
 this.image = this.localstorage.retrieve("image");



  }


  goToUserProfile()
  {
    this.router.navigateByUrl('/userProfile/'+this.username);
  }

  logout()
  {
    this.authService.logout();
    this.isLoggedIn=false;
    this.router.navigateByUrl('').then(() => {
      window.location.reload();
    })
  }


  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }



  
}
