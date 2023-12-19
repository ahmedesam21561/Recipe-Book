import { Ingredient } from "../Shared/ingredents.model";

export class recipe{
  public Name:string;
  public Description:string;
  public Imagepath:string;
  public ingredients:Ingredient[];
  constructor(name:string,desc:string,path:string,ingredients:Ingredient[]){
    this.Name=name;
    this.Description=desc;
    this.Imagepath=path;
    this.ingredients=ingredients;
  }
}
