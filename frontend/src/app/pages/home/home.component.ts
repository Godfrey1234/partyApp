import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  isvisible = false;
   overflow ="";

  ngOnInit(): void {

   this.isvisible = false
   this.overflow = ""
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


}

