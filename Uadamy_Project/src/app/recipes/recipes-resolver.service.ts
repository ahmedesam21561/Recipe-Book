import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { recipe } from "./recipe.model";
import { DataStorageService } from "../Shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeServices } from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<recipe[]>{

  constructor(private dataStorageService:DataStorageService, private recipeService:RecipeServices){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): recipe[] | Observable<recipe[]> | Promise<recipe[]> {
    const recipes=this.recipeService.getRecipes();
    if(recipes.length===0)
    {
      return this.dataStorageService.fetchRecipes();
    }else{
      return recipes;
    }

  }
}
