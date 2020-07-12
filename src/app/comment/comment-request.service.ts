import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommentRequest} from './comment-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentRequestService {
  constructor(private http:HttpClient) { }

  postAComment(commentRequest:CommentRequest):Observable<any>
  {
    return this.http.post<any>('https://redditcloneapi.herokuapp.com/api/comments',commentRequest);
  }


  getCommentsByPostid(postId: number):Observable<CommentRequest[]> {

    return this.http.get<CommentRequest[]>('https://redditcloneapi.herokuapp.com/api/comments/getByPost/'+postId);

  }


  getCommentsByCurrentUser():Observable<CommentRequest[]> {

    return this.http.get<CommentRequest[]>('https://redditcloneapi.herokuapp.com/api/comments/getByCurrentUser/');

  }

  getCommentsByUser(username:string):Observable<CommentRequest[]> {

    return this.http.get<CommentRequest[]>('https://redditcloneapi.herokuapp.com/api/comments/getByUsername/'+username);

  }

}
