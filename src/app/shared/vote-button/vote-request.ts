import {VoteType} from './vote-type';

export class VoteRequest
{
    postId?:number;
    voteTime?:string;
    voteType:VoteType;
    
}