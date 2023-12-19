import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/ingredents.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[];

  private subscription:Subscription;

  constructor(private slService:ShoppingListService,private loggingService:LoggingService){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ingredients=this.slService.getIngredients();
    this.subscription= this.slService.ingredientChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
    this.loggingService.printLog('Hello from ShoppingListComponent in ngOnInit');
  }


  onEditItem(index:number){
    this.slService.startedEditting.next(index);
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }


}
