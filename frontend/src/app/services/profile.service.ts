import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

REST_API: string = 'https://party-app-rho.vercel.app/';

constructor(private httpClient: HttpClient) { }

GetAllUsers(id: any) {
  return this.httpClient.get(this.REST_API + '/profile/' + id);
}

updateProfile(id: any, data: any){
  return this.httpClient.put(this.REST_API + '/profile/' + id, data);
}

getUser(user_id:any){
  return this.httpClient.get(this.REST_API + '/getUser/' + user_id);
}


  //Provider details update
  updateProviderProfile(id: any, data: any){

    return this.httpClient.put(this.REST_API +'/updateProviderProfile/'+id, data);

    }

    AddContent(id: any,data: any){

      return this.httpClient.post(this.REST_API+ '/addContent/'+id,data);
    }
  

    getContent(user_id:any){
      return this.httpClient.get(this.REST_API + '/getContent/' + user_id);
    }


  //Provider Description update
  descUpdate(id: any, data: any){
    return this.httpClient.put(this.REST_API +'/updateDescription/'+id, data);
  }
  

   


    

}
