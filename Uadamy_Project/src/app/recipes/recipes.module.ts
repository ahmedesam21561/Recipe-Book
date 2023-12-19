import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStratComponent } from "./recipe-strat/recipe-strat.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../Shared/shared.module";

@NgModule(
  {
    declarations:
    [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStratComponent,
    RecipeEditComponent
    ],
    imports:
    [
      ReactiveFormsModule,
      RouterModule,
      RecipesRoutingModule,
      SharedModule
    ]
  }
)
export class RecipesModule{}
