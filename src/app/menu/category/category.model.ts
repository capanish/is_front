import { Active } from '../../active.enum';
import { Menu } from '../menu.model';
export class Category{
    public id:number;
    public subMenuName:string;
    public menuId:Menu;
    public image:string;
    public active:Active;
    public notification:number;

    constructor(id:number,subMenuName:string,menuId:Menu,image:string,active:Active,notification:number){
        this.id=id;
        this.subMenuName=subMenuName;
        this.menuId=menuId;
        this.image=image;
        this.active=active;
        this.notification=notification;

    }
}
