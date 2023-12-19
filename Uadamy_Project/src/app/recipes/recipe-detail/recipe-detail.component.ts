import { Component } from '@angular/core';
import { recipe } from '../recipe.model';
import { RecipeServices } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

   recipe:recipe;
   id:number;
  constructor(private recipeService:RecipeServices,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const id=this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (Params:Params) =>{
        this.id= +Params['id'];
        this.recipe=this.recipeService.getRecipe(this.id);
      }
    )
  }
  onAddToShoppingList(){
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);

  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
