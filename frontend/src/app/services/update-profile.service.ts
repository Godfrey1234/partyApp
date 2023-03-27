import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//const baseUrl = 'http://localhost:3000/updateDescription/';



@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  REST_API: string = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

  //Provider Description update
  descUpdate(id: any, data: any){
    return this.http.patch(this.REST_API +'/updateDescription/'+id, data);
  }

  //Provider details update
  updateProviderProfile(id: any, data: any){
return this.http.patch(this.REST_API +'/updateProviderProfile/'+id, data);
}

//get single user profile details
getUserProfile(id: any, data: any){
  return this.http.get(this.REST_API +'/getOneUserProfile/'+id, data);
  }

forgotPassword(data: any){
  return this.http.post(this.REST_API + "/forgotPassword/", data);
}

resetPassword(reset_token: any,data: any){
  return this.http.post(this.REST_API + "/resetPassword/"+reset_token, data);
}

}
