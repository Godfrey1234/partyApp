import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})

export class PartyTainersService {

 
  constructor(private http:HttpClient) { }

  baseurl = "http://localhost:3000/"
  token !: string;
  jwtHelper = new JwtHelperService;


  saveToken(token : string): void
  {
    this.token = token;
    sessionStorage.setItem('token',token);
  }

  regprovider(data: any){
    return this.http.post(this.baseurl+ "regprovider",data);
  }

  register(data: any){
    return this.http.post(this.baseurl+ "register",data);
  }

  login(data: any){
    return this.http.post(this.baseurl+ "login",data);
  }

  getProvider(data: any){
    return this.http.post(this.baseurl+ "getProvider",data);
  }



  booking(data: any){

    return this.http.post(this.baseurl+ "booking",data);
  }



  getProviderbyID(id:any){
    
    return this.http.get(this.baseurl+ "providerbyid/"+id);

  }

  getOneUserProfile(user_id:any){
return this.http.get(this.baseurl+ "getOneUserProfile/"+user_id);
  }

  rating(data: any){
    return this.http.put(this.baseurl +"rating", data);
  }


  getCountNotifications(id:any){
    
    return this.http.get(this.baseurl+ 'CountNotifications/'+id);

  }

}
