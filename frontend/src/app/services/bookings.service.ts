import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

REST_API: string = 'http://localhost:3000';

constructor(private http : HttpClient) { }

GetList(id:any) {
  return this.http.get(this.REST_API + '/getProviderBookings/'+id);
}

update(id: any, data: any){
  return this.http.put(this.REST_API +'/providerUpdateBookings/'+id, data);
}

bookingDetailsUpdate(id: any, data: any) {
  return this.http.put(this.REST_API +'/updateBookingDetails/'+id, data);
}

cancelBooking(booking_id: any, data: any) {
  return this.http.put(this.REST_API +'/cancelBooking/'+booking_id,data);
}

GetPending(id:any) {
  return this.http.get(this.REST_API + '/countPending/'+id);
}

GetCancelled(id:any) {
  return this.http.get(this.REST_API + '/countCancelled/'+id);
}

GetApproved(id:any) {
  return this.http.get(this.REST_API + '/countApproved/'+id);
}

GetDeclined(id:any) {
  return this.http.get(this.REST_API + '/countDeclined/'+id);
}

GetNotifications(id:any) {
  return this.http.get(this.REST_API + '/getNotification/'+id);
}

Read(id: any, data :any) {
  return this.http.put(this.REST_API +'/ReadNotification/'+id,data);
}

}
