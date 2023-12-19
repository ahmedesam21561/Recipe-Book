//import { RecipeServices } from './../../recipe.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
 @Input() REcipe:recipe;
 @Input() index:number;

//  constructor(private recipeService:RecipeServices){}
//  onSelect(){
//     this.recipeService.recipeSelected.emit(this.REcipe)
//  }

}
