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
    return this.http.post<any>('http://localhost:8080/api/comments',commentRequest);
  }


  getCommentsByPostid(postId: number):Observable<CommentRequest[]> {

    return this.http.get<CommentRequest[]>('http://localhost:8080/api/comments/getByPost/'+postId);

  }


  getCommentsByCurrentUser():Observable<CommentRequest[]> {

    return this.http.get<CommentRequest[]>('http://localhost:8080/api/comments/getByCurrentUser/');

  }

  getCommentsByUser(username:string):Observable<CommentRequest[]> {

    return this.http.get<CommentRequest[]>('http://localhost:8080/api/comments/getByUsername/'+username);

  }

}
