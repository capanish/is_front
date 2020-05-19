import { Active } from '../active.enum';
export class Menu{
    public id:number;
    public menuName:string;
    public image:string;
    public active:Active;
    public notification:number;

    constructor(id:number,menuName:string,image:string,active:Active,notification:number){
        this.id=id;
        this.menuName=menuName;
        this.image=image;
        this.active=active;
        this.notification=notification;

    }
}