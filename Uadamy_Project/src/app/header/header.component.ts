import {
          Component,
          EventEmitter,
          OnDestroy,
          OnInit,
          Output
        } from "@angular/core";
import { DataStorageService } from "../Shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{

  // @Output() featureSelected=new Subject<string>();

  // onSelect(feature:string){
  //   this.featureSelected.next(feature);
  // }

  private userSub:Subscription;
  isAuthenticated=false;
  constructor(private dataStorageService:DataStorageService,private authService:AuthService){}

  ngOnInit(): void {
     this.userSub=this.authService.user.subscribe(user=>{
      this.isAuthenticated= !!user;
      console.log(!user);
      console.log(!!user);
     });
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut(){
    this.authService.LogOut();
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
