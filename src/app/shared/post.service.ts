import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PostModel} from './post-model';
import {CreatePost} from '../post/create-post/create-post.request';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }


  getAllPosts():Observable<PostModel[]>
  {
    return this.http.get<PostModel[]>('https://redditcloneapi.herokuapp.com/api/posts');
  }


  createPost(postRequest:CreatePost):Observable<PostModel>
  {
    return this.http.post<PostModel>('https://redditcloneapi.herokuapp.com/api/posts',postRequest);
  }

  getPostById(id:number):Observable<PostModel>
  {
    return this.http.get<PostModel>('https://redditcloneapi.herokuapp.com/api/posts/'+id);
  }


  getPostByUsername(username:string):Observable<PostModel[]>
  {
    return this.http.get<PostModel[]>('https://redditcloneapi.herokuapp.com/api/posts/byUser/'+username);
  }

}
