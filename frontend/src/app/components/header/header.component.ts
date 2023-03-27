import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { PartyTainersService } from 'src/app/services/party-tainers.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user_id: any;
  countNotify: any;
  isvisible = false;
  overflow = "";

 

  constructor(private jwt:JwtService, private router : Router, private profileService: ProfileService, private partyTainerService : PartyTainersService) { }
  initials:any;
  account_type:any;

  ngOnInit(): void {
    this.user_id = this.jwt.getData(sessionStorage.getItem('token')).user_id;

  this.getLoggedinUserDetails();
  this.countNotifications();
  }


  onClick(){
    this.isvisible = true
   
    console.log(this.isvisible)
    location.reload()
    
  }
  
  menu(){
    this.overflow = "fixed"
    console.log('milgji')
  }

  logout()
  {
    sessionStorage.clear();
    localStorage.clear();
   // this.isLoggedIn = false;
   // clearInterval(this.ref);
   // sessionStorage.setItem('isLoggedIn','no');
    this.router.navigateByUrl('/home');
    // if(this.jwt.getData('token').length ==0)
    // {
    //   this.router.navigateByUrl('/home');
    // }
  }

  countNotifications(){

    this.getLoggedinUserDetails()

    this.partyTainerService.getCountNotifications(this.user_id).subscribe((data:any)=>{
      console.log(data)
      this.countNotify = data;
      

    })
    
    
  }

  getLoggedinUserDetails(){

    const {user_email,user_name,user_lastname,account,user_id} = this.jwt.getData(sessionStorage.getItem('token'));
   
    this.user_id = user_id;
    this.profileService.getUser(this.user_id).subscribe((res:any)=>{
      this.account_type=sessionStorage.getItem('account');
    this.initials = res.user_name.substr(0,1).toUpperCase() + res.user_lastname.substr(0,1).toUpperCase()
    console.log(res.user_name + res.user_lastname)

    });



   
   
    
    
  }
}
