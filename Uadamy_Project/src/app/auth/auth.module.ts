import { NgModule } from "@angular/core";
import { AuthCopmonent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../Shared/shared.module";

@NgModule({
  declarations:[AuthCopmonent],
  imports:[CommonModule,FormsModule,RouterModule.forChild(
    [ {
      path:'',component:AuthCopmonent
      }
    ]
  ),SharedModule]
})
export class AuthModule{}
