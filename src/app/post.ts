export class Post{
    id:number;
    title:string;
    content:string;
    category:string;
    image:string;

    public constructor(_id:number,
        _title:string, _image:string){

        this.title=_title;
        this.image = _image;
        this.id = _id;
        
    }

}