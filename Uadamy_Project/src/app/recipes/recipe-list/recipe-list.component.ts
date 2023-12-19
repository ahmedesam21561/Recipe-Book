import { ActivatedRoute, Router } from '@angular/router';
import { RecipeServices } from './../recipe.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  subscription:Subscription;

  recipes:recipe[];
  constructor(private recipeService:RecipeServices,private router:Router,private route:ActivatedRoute){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscription= this.recipeService.recipesChanged.subscribe(
      (recipes:recipe[])=>{
        this.recipes=recipes;
      }
    );
    this.recipes=this.recipeService.getRecipes();
  }
  onNewRecipe(){
      this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
  this.subscription.unsubscribe();
  }

}
