import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import {CommentRequest} from '../../comment/comment-request';
import {CommentRequestService} from '../../comment/comment-request.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  commentForm:FormGroup;
  postId:number;
  post:PostModel;
  commentRequest:CommentRequest;
  comments: CommentRequest[];


  constructor(private postService:PostService,private activateRoute:ActivatedRoute,private commentService:CommentRequestService) { 

    

    this.commentForm = new FormGroup({
      text: new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {

    this.postId = this.activateRoute.snapshot.params.id; 
    console.log(this.activateRoute.snapshot.params.id);
    
      this.commentRequest={
        text:'',
        postId:this.postId
      };


      this.getCommentsForPost();
      this.getPostById();
  }


  postComment(id:number)
  {
    this.commentRequest.text  = this.commentForm.get('text').value;
    console.log(this.commentRequest);
    this.commentService.postAComment(this.commentRequest).subscribe(data=>
      {
        this.getCommentsForPost();
        console.log(data);
        this.commentForm.get('text').setValue('');
        
      },
      error=>
      {
        console.log(error);
      })
  }



  private getCommentsForPost() {
    this.commentService.getCommentsByPostid(this.postId).subscribe(data => {
      this.comments = data;
      console.log(this.comments);
    }, error => {
    });
  }

  private getPostById() {
    this.postService.getPostById(this.postId).subscribe(data => {
      this.post = data;
      console.log(this.post);
    }, error => {
    });
  }

  
}
