import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeServices } from "../recipes/recipe.service";
import { recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn:'root'})
export class DataStorageService {

  isSaved=false;
  constructor(private recipeService:RecipeServices,private http:HttpClient, private authService:AuthService){}


  storeRecipes(){
    const recipes=this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-703ef-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response =>{
      console.log(response);
    });
  }

  fetchRecipes(){
    return this.http
   .get<recipe[]>('https://ng-course-recipe-book-703ef-default-rtdb.firebaseio.com/recipes.json').pipe(map(recipes=>{
      return recipes.map(recipe=>{
        return {...recipe,ingredients:recipe.ingredients ? recipe.ingredients :[]};
      });
    }),tap(recipes=>{
      this.recipeService.setRecipes(recipes);
    }));
    // const recipes=this.recipeService.getRecipes();
  };
  }
