import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { GuardService } from "./guard.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private guardService :GuardService ,private router :Router){
     
  }


  
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if(this.guardService.IsAuthenticated()) {
  //     return true
  //   }else{
  //     this.router.navigate(['/home'])
  //     return true
  //   }
  // }
}
