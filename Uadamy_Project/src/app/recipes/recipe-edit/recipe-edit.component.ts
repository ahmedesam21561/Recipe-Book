import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeServices } from '../recipe.service';
import { recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  id:number;
  editmode=false;

  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute,private recipeService:RecipeServices,private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe(
      (Params:Params) =>{
        this.id= +Params['id'];
        this.editmode = Params['id'] != null ;
        this.initForm();
      }
    )
  }

  onSubmit(){

    const newRecipe=new recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['descreption'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']

    );

    if(this.editmode){

      this.recipeService.updateRecipe(this.id,newRecipe);
    }else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  private initForm(){

    let recipeName='';
    let recipeImagePath='';
    let recipeDescreption='';
    let recipeIngredients=new FormArray([]);

    if(this.editmode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.Name;
      recipeImagePath=recipe.Imagepath;
      recipeDescreption=recipe.Description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[Validators.pattern(/^[1-9]+[0-9]*$/),Validators.required])
            })
          );
        }
      }

    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'descreption':new FormControl(recipeDescreption,Validators.required),
      'ingredients':recipeIngredients
    });
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.pattern(/^[1-9]+[0-9]*$/),Validators.required])
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
