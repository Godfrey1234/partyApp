import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PartyTainersService } from './party-tainers.service';
import { NgToastModule} from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
 
  constructor(private router:Router, private partyService: PartyTainersService, private toast:NgToastModule ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('token') != null){
        return true;
      }else{
        this.router.navigate(['/home']);
        //this.toast.warning({detail: 'Info', summary: 'Please Login', duration:3000,position:'tr'});
        return false;

      }
    
  }
  
}