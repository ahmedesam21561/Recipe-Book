import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";


export interface AuthResponseData{
  kind : string;
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;
  registered ?: boolean;
}


@Injectable({providedIn:'root'})

export class AuthService{

  user=new BehaviorSubject<User>(null);

  private tokenExpirationTimer:any;

  constructor(private http:HttpClient,private router:Router){}


  SignUP(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgF-f_wWm4SX1p0fMx_wjjLFMgQujZKr4',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError),tap(resData=>{
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
      }));
  }
  LogIn(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgF-f_wWm4SX1p0fMx_wjjLFMgQujZKr4',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError),tap(resData=>{
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
      }));
  }

  autologin(){
   const userData:{
    email:string;
    id:string;
    _token:string;
    _tokenExpirationDate:string;

   }=JSON.parse(localStorage.getItem('userData'));

   if(!userData)
   {
    return;
   }
   const loadedUser=new User(userData.email,
    userData.id,
    userData._token,
    new Date(userData._tokenExpirationDate)
    );

   if(loadedUser.token)
   {
    this.user.next(loadedUser);
    const expirationDuration=new Date(userData._tokenExpirationDate).getTime() -
    new Date().getTime();
    this.autoLogout(expirationDuration);
   }

  }

  LogOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
  }

  autoLogout(expirationDate:number){
   this.tokenExpirationTimer= setTimeout(()=>{
      this.LogOut();
    },expirationDate)
  }


  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate=new Date(new Date().getTime()+ expiresIn * 1000);
      const user=new User(email,userId,token,expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn*1000);
      localStorage.setItem('userData',JSON.stringify(user));
  }
  private handleError(errorRes:HttpErrorResponse){
    let errorMessage='An Unknown error Occurred';
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage="This Email Exists already";
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage="This Email does Not Exist";
          break;
        case 'INVALID_PASSWORD':
          errorMessage="This Password is not Correct";
          break;
      }
      return throwError(errorMessage);
    }

}
