export class comment{
    postid : number;
    content:string;
    author:string;
    id:number;

   constructor(_postid:number, _content:string, _author:string, _commentid:number){

        this.postid = _postid;
        this.content = _content;
        this.author = _author;
        this.id = _commentid;
    }
}