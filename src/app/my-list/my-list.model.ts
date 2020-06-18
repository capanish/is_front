import { Active } from '../active.enum';

export class MyList{
  public id:number;
  public itemName:string;
  public image:string;
  public active:Active;
  public notification:number;

  constructor(id:number,itemName:string,image:string,active:Active,notification:number){
      this.id=id;
      this.itemName=itemName;
      this.image=image;
      this.active=active;
      this.notification=notification;
   }
}
