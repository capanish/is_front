import { Active } from '../active.enum';

export class Recipe{
  public id:number;
  public recipeName:string;
  public image:string;
  public active:Active;
  public notification:number;

  constructor(id:number,recipeName:string,image:string,active:Active,notification:number){
      this.id=id;
      this.recipeName=recipeName;
      this.image=image;
      this.active=active;
      this.notification=notification;
   }
}
