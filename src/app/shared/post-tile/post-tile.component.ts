import { Component, OnInit, Input } from '@angular/core';
import {faArrowUp,faArrowDown,faComments} from '@fortawesome/free-solid-svg-icons';
import {PostModel} from '../post-model';
import {PostService} from '../post.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  
  faComments = faComments;
  @Input() posts: PostModel[];


  constructor(private postService:PostService,private router:Router) { }

  ngOnInit(): void {


   
  }


  goToPost(id:number)
  {
    this.router.navigateByUrl('/view-post/'+id);
  }

}
