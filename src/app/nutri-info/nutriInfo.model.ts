import { Active } from '../active.enum';
import { Category } from '../category/category.model';
export class NutriInfo{
    public id:number;
    public subMenuID:Category;
   /* public procureDate :Date;
    public sugar : number;
    public water : number;
    public sodium: number;
    public calcium: number;
    public iron : number;
    public itemDescription : string;
    public location : string;
    public active:Active;*/
    public image:string;
    
   

    constructor(id:number,subMenuID:Category, image:string){
        this.id=id;
        this.subMenuID=subMenuID;
        this.image=image;
       
    }
/*
    constructor(id:number,subMenuID:Category, procureDate:Date, sugar : number,
        water : number, sodium: number, calcium: number, iron : number, 
        itemDescription : string, location : string,image:string,active:Active){
       this.id=id;
       this.subMenuID=subMenuID;
       this.procureDate=procureDate;
       this.sugar=sugar;
       this.water=water;
       this.sodium=sodium;
       this.calcium=calcium;
       this.iron=iron;
       this.itemDescription=itemDescription;
       this.location=location;
       this.image=image;
       this.active=active;
   }*/

}