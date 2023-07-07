import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  datePipe: any;
  dateLog: any;
  constructor( private router: Router){}
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  tokenExp:any 
  ngOnInit(): void {
    this.timeOut()
    
  }
 
  Logout(){
    sessionStorage.removeItem('user'); 
    sessionStorage.removeItem('tokenExp')
    //localStorage.setItem('user', '');
    window.location.href='/'
   
   
  }

  
  

  timeOut(){
   
    
    setInterval(this.Exp, 150000);
  }
  
  Exp() {
    
    let date = new Date();
    let hours = date.getHours();
    let hourExp = date.getHours();
    let minutes = date.getMinutes();
    let minuteExp = date.getMinutes()+1;
    let seconds = date.getSeconds();
    this.datePipe = hours+":"+minutes+":"+seconds
    let dateExp = hourExp+":"+minuteExp+":"+seconds
    //console.log(this.datePipe);
    let tab= sessionStorage.getItem('tokenExp')?.split(":")
    //console.log(tab );
    
    if ( parseInt(tab![0]) == hours && (parseInt(tab![1]) < minutes  )) {
      sessionStorage.removeItem('user'); 
      sessionStorage.removeItem('tokenExp')
      window.location.href='/'
    }
   
  }

  
  

}
