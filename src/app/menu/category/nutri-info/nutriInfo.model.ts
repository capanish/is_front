import { Category } from '../../category/category.model';
export class NutriInfo{
    public id:number;
    public name:string;
    public subMenuID:Category;
    public image:string;



    constructor(id:number,name:string,subMenuID:Category, image:string){
        this.id=id;
        this.name=name;
        this.subMenuID=subMenuID;
        this.image=image;

    }


}
