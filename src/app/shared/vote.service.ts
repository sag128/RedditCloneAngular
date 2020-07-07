import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {VoteRequest} from '../shared/vote-button/vote-request';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }


  postVote(vote:VoteRequest):Observable<any>
  {
    return this.http.post('http://localhost:8080/api/votes',vote);
  }

  getVotesByUsername(username:string):Observable<any>
  {
    return this.http.get('http://localhost:8080/api/votes/getVoteByUser/'+username);
  }






}
