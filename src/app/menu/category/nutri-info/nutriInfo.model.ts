import { Category } from '../../category/category.model';
export class NutriInfo{
    public id:number;
    public subMenuID:Category;
    public image:string;



    constructor(id:number,subMenuID:Category, image:string){
        this.id=id;
        this.subMenuID=subMenuID;
        this.image=image;

    }


}
