import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../Shared/shared.module";

@NgModule
(
  {
    declarations:[
      ShoppingListComponent,
    ShoppingEditComponent
    ],
    imports:[
      FormsModule,
      RouterModule.forChild([
        {path:'',component:ShoppingListComponent}
      ]),
      SharedModule
    ]
  }
)
export class ShoppingListModule{}
