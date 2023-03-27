import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/bookings';

@Injectable({
  providedIn: 'root'
})
export class ClientBookingsService {
  REST_API: string = 'https://party-app-rho.vercel.app/';

  constructor(private http: HttpClient) { }
  
  get(id: any){
    return this.http.get(this.REST_API +'/getClientsBookings/'+id);
  }
}
