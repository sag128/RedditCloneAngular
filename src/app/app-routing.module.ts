import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {UserProfileGuardService} from './auth/user-profile/user-profile-guard.service';
const routes: Routes = [
  {path: 'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'create-post',component:CreatePostComponent, canActivate: [AuthGuardService] },
  {path:'create-subreddit',component:CreateSubredditComponent  , canActivate: [AuthGuardService]},
  {path:'list-subreddits',component:ListSubredditsComponent,canActivate: [AuthGuardService]},
  {path:'view-post/:id',component:ViewPostComponent,canActivate: [AuthGuardService]},
  {path:'userProfile/:username',component:UserProfileComponent, canActivate: [AuthGuardService]}

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
