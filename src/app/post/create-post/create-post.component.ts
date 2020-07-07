import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {faArrowDown,faArrowUp} from'@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { PostService } from 'src/app/shared/post.service';
import { ToastrModule } from 'ngx-toastr';
import { CreatePost } from './create-post.request';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  createPostForm:FormGroup;
  createPostRequest: CreatePost;
  subreddits:Array<SubredditModel>;


  constructor(private router:Router,private subredditService:SubredditService, private postService:PostService, private toaster:ToastrModule) { 



  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('',Validators.required),
      url: new FormControl('',Validators.required),
      subredditName:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required)
    })
    
    this.createPostRequest={
      postName:'',
      description:'',
      subredditName:'',
      url:'',
    }
  

    this.subredditService.getAllSubreddits().subscribe(
      data=>
      {
        console.log(data);
        this.subreddits=data;
      },
      error=>
      {
        console.log(error);
        throwError(error);

      })
    }
  

    createPost()
    {
      this.createPostRequest.description = this.createPostForm.get('description').value;
      this.createPostRequest.subredditName = this.createPostForm.get('subredditName').value;
      this.createPostRequest.url = this.createPostForm.get('url').value;
      this.createPostRequest.postName = this.createPostForm.get('postName').value;


      this.postService.createPost(this.createPostRequest).subscribe(data=>
        {
          console.log(data)
          this.router.navigateByUrl('/')
        },
        error=>
        {
          console.log(error);
          throwError(error);
        }
        )
    }
  
  
  discardPost()
  {
    this.createPostForm.reset();
  }
  


}
