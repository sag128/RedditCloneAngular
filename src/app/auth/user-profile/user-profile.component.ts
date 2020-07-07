import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { CommentRequestService } from 'src/app/comment/comment-request.service';
import { PostModel } from 'src/app/shared/post-model';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CommentRequest } from 'src/app/comment/comment-request';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';
import { VoteService } from 'src/app/shared/vote.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  
})
export class UserProfileComponent implements OnInit {

   name:string;
  posts:PostModel[];
  commentLength:number;
  postLength:number;
  userVerify:boolean;
  comments:Array<CommentRequest>;
  nameChange:any;
  voteResponse:any;
  voteLength:number;


  constructor(private postService:PostService,private commentService:CommentRequestService,private activateRoute:ActivatedRoute,private authService:AuthService,private router:Router, private voteService:VoteService) { 


    this.name = this.activateRoute.snapshot.params.username;

   
    if(this.name!=this.authService.getUserName())
    {
      this.userVerify = false;
      //this.router.navigate(['/userProfile/'+this.authService.getUserName()])
      this.redirectTo('/userProfile/'+this.authService.getUserName())

    }
    else
    {
      this.userVerify=true;
      //this.redirectTo('/userProfile/'+this.authService.getUserName())
    this.postService.getPostByUsername(this.name).subscribe(data=>
      {
        this.posts = data;
        console.log(this.posts);
        this.postLength = this.posts.length;
      })


this.getComments();




}

  }



async  getComments():Promise<any>
  {

this.commentService.getCommentsByUser(this.name).subscribe(data=>
  {


    this.comments=data;
    this.commentLength = this.comments.length;
    
    
    for (let i=0; i<=this.comments.length; i++)
    {
      

      let postId = Number(this.comments[i]['postId']);
      
      this.postService.getPostById(postId).subscribe(
        
          dataFor=>
          {
            
          this.comments[i]["postName"] = dataFor["postName"]
          
          },
          error=>
          {
            console.log(error);
            
          }
       )}
  
  
  
  
  },
  error=>
  {
    console.log(error);
    
  })
    
    



  
  
}




//   changes(routerName:string)
//   {
    
//     this.name = this.activateRoute.snapshot.params.username;

   
//     if(routerName!=this.authService.getUserName())
//     {
//       this.userVerify = false;
//       this.router.navigateByUrl('/userProfile/'+this.authService.getUserName())


//     }
//     else
//     {
//       this.userVerify=true;
//       this.router.navigateByUrl('/userProfile/'+this.authService.getUserName())
    
//     this.postService.getPostByUsername(routerName).subscribe(data=>
//       {
//         this.posts = data;
//         console.log(this.posts);
//         this.postLength = this.posts.length;
//       })
  
  
// this.commentService.getCommentsByUser(routerName).subscribe(data=>
//   {
//     this.comments=data;
//     this.commentLength = this.comments.length;
//   })


// }

//   }



  ngOnInit(): void {
    this.getVotesByUser();
  
    }

    redirectTo(uri:string){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
   }

getVotesByUser()
{
  this.voteService.getVotesByUsername(this.authService.getUserName()).subscribe(data=>
    {
      console.log(data)
      this.voteResponse=data;
      this.voteLength = data.length;
    })
}

  
  }






