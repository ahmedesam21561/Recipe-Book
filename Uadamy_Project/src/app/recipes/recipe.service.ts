import { EventEmitter, Injectable } from "@angular/core";
import { recipe } from "./recipe.model";
import { Ingredient } from "../Shared/ingredents.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeServices{

  recipesChanged=new Subject<recipe[]>();

  // private recipes:recipe[]=[new recipe(
  // 'Tasty Schnitzel',
  // 'a Super-tasty Schnitzel - just Awseme',
  // 'https://www.thespruceeats.com/thmb/JtOA_LnrhrW_TfS3MYCqlPqhUFA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/basic-congee-recipes-4065244-hero-01-5cf81547c34d4520be10bb57c6cda902.jpg',
  // [
  //   new Ingredient('meat',3),
  //   new Ingredient('French Fries',20)
  // ]),
  // new recipe(
  // 'Another test recipe',
  // 'this is Another recipe',
  // 'https://www.thespruceeats.com/thmb/JtOA_LnrhrW_TfS3MYCqlPqhUFA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/basic-congee-recipes-4065244-hero-01-5cf81547c34d4520be10bb57c6cda902.jpg',
  // [
  //   new Ingredient('Buns',2),
  //   new Ingredient('Meat',1)
  // ])
  // ]

  private recipes:recipe[]=[];
  constructor(private slService:ShoppingListService){}
setRecipes(recipes:recipe[]){
  this.recipes=recipes;
  this.recipesChanged.next(this.recipes.slice());
}

getRecipes(){
  return this.recipes.slice();
}

getRecipe(index:number){
  return this.recipes[index];
}


addIngredientToShoppingList(ingredient:Ingredient[]){
  this.slService.addIngredients(ingredient);
}

addRecipe(recipe:recipe){
this.recipes.push(recipe);
this.recipesChanged.next(this.recipes.slice());
}

updateRecipe(index:number,newRecipe:recipe){
this.recipes[index]=newRecipe;
this.recipesChanged.next(this.recipes.slice());
}

deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.recipesChanged.next(this.recipes.slice());
}

}
