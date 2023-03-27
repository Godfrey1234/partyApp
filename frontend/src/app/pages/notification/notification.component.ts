import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import { JwtService } from 'src/app/services/jwt.service';
import { notifications } from 'src/app/interface/interface';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  id:any;
  notify !: notifications[];

  notification = new FormGroup({
      
    status :new FormControl(''),
    
  });


  // create a date from string:
 date = new Date()

// create date for now:
 today = new Date();

// then calculate the difference:
  difference : any;



  constructor(private bookingService : BookingsService, private jwt : JwtService) { }

  ngOnInit(): void {

   this.getNotifications();
    this.getLoggedinUserDetails();

    this.difference = this.today.getTime() - this.date.getTime();

    console.log(this.difference + "difference")
  }
 
  getLoggedinUserDetails(){
    const {user_email,user_name,user_lastname,account,user_id} = this.jwt.getData(sessionStorage.getItem('token'));
     
    this.id = user_id;

  }

  getNotifications(){

    this.getLoggedinUserDetails();
 

   this.bookingService.GetNotifications(this.id).subscribe((data:any)=>{
    console.log(data)

    this.notify = data;
    this.date = data[0].date
   console.log(this.date +"dddd"+ this.today)
   
   console.log(this.today)
   console.log(this.today.getTime())

   

   })
  }

  onRead(notification_id:any){

    this.notification.value.status = "Read"
    this.bookingService.Read(notification_id,this.notification.value).subscribe((data:any)=>{
      console.log(data)
      this.getNotifications();

      location.reload()


    })

  }

}
