import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SubredditModel} from './subreddit-model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http:HttpClient) { }


  subreddit:SubredditModel[];


  getAllSubreddits():Observable<SubredditModel[]>
  {
   return this.http.get<SubredditModel[]>('https://redditcloneapi.herokuapp.com/api/subreddit');
  }


  postCreateSubreddit(subredditModel:SubredditModel):Observable<SubredditModel>
  {
    return this.http.post<SubredditModel>("https://redditcloneapi.herokuapp.com/api/subreddit",subredditModel);
  }






}
