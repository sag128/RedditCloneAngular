import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {VoteService} from '../vote.service';
import {VoteRequest} from './vote-request';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { VoteType } from './vote-type';



@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {


  @Input() post: PostModel;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  voteRequest:VoteRequest;

  constructor(private voteService:VoteService, private authService:AuthService, private postService:PostService, private toaster:ToastrService) {


    this.voteRequest={
      postId:undefined,
      voteType:undefined,
    
    }
   }


  ngOnInit(): void {
  }



  upvotePost()
  {


    this.voteRequest.voteType=VoteType.UPVOTE;
    this.vote();
  }



  downvotePost(){

    this.voteRequest.voteType=VoteType.DOWNVOTE;
    this.vote();

  }



  vote() {
  
      this.voteRequest.postId=this.post.id;
      this.voteService.postVote(this.voteRequest).subscribe(data=>
        {
          this.updateDetails();
          console.log(this.voteRequest.voteType);
          if(this.voteRequest.voteType==0)
          {
            this.toaster.success("You UPVOTED for the post","Success",{progressBar:true})
          }

          if(this.voteRequest.voteType==1)
          {
            this.toaster.success("You DOWNVOTED for the post","Success",{progressBar:true})
          }
          
        },
        
        error=>
        {
          this.toaster.error(error.error.message,"Error",{progressBar:true})
          console.log(error);
        }
        )


  }

  updateDetails()
  {
    this.postService.getPostById(this.post.id).subscribe(data=>
      {
        this.post=data;
      })
  }


}
