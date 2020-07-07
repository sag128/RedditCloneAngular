import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubredditModel } from '../subreddit-model';
import { Router } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  subredditModel:SubredditModel;
  createSubredditForm:FormGroup;
  constructor(private router:Router, private subredditService:SubredditService, private toaster:ToastrService) { 



    this.createSubredditForm = new FormGroup(
      {
        title: new FormControl('',Validators.required),
        description: new FormControl('',Validators.required)
      }
    )

  }

  ngOnInit(): void {

    this.subredditModel={

      name:'',
      description:''
    }

  }



  discard()
  {
    this.createSubredditForm.reset();
  }

  createSubreddit()
  {
    this.subredditModel.name=this.createSubredditForm.get('title').value;
    this.subredditModel.description=this.createSubredditForm.get('description').value;
    console.log(this.subredditModel.description,this.subredditModel.name)

    this.subredditService.postCreateSubreddit(this.subredditModel).subscribe(data=>
      {
        console.log(data);
        this.toaster.success("Subreddit Created","Success",{progressBar:true});
        this.router.navigateByUrl('/list-subreddits');
      },
      error=>
      {
        if(error.error.text.toString().includes("already"))
        {
        this.toaster.error("Subreddit Already exusts","Error",{progressBar:true});
        }
        else{
          this.toaster.error("Subreddit Already exists","Error",{progressBar:true});
        }
      }

      )
  }

}
