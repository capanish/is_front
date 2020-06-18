import { MyList } from './my-list.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Active } from '../active.enum';

@Injectable({ providedIn: 'root' })
export class MyListService implements OnInit {

    public listItems: MyList[]=
    [new MyList(1, "Romaine ", "image",Active.Y,0),
     new MyList(2, "Salami ", "image",Active.Y,0),
     new MyList(3, "Green peas ", "image",Active.Y,0),
     new MyList(4, "Olive Oil", "image",Active.Y,0),
     new MyList(5, "Garlic ", "image",Active.Y,0),
     new MyList(6, "Parmesan ", "image",Active.Y,0),
     new MyList(7, "Milk ", "image",Active.Y,0),
     new MyList(8, "Eggs ", "image",Active.Y,0),
     new MyList(9, "Beer", "image",Active.Y,0)
    ];

    public listItemCount:number =0;

    constructor(private http:HttpClient){}

    ngOnInit() {

     }

     getMyListItems(){
       return this.listItems;
    }



    }
