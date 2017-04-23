export class Post{
    id:number;
    title:string;
    content:string;
    category:string;
    image:string;
    createdate:string;

    public constructor(_id:number,
        _title:string, _image:string, _content, _createdate){

        this.title=_title;
        this.image = _image;
        this.id = _id;
        this.content = _content
        this.createdate=_createdate    
    }

}