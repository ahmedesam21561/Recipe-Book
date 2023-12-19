import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredents.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  // @ViewChild('nameInput',{static:true}) nameInputRef:ElementRef;
  // @ViewChild('amountInput',{static:true}) amountInputRef:ElementRef;
  @ViewChild('f',{static:false}) slForm:NgForm;
  subscreption:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private slService:ShoppingListService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscreption=this.slService.startedEditting.subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
      this.subscreption.unsubscribe();
  }

  onSubmit(form:NgForm){
    // const ingName=this.nameInputRef.nativeElement.value;
    // const ingAmount=this.amountInputRef.nativeElement.value;
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updatedIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }


}
