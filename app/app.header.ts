import {OnInit,Component} from '@angular/core';
//import {AuthService} from './AuthenticationService'
import {AuthService} from './AuthenticationService';
import {Router,Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
selector:'appheader',
template:`
<div>

  
  <div style="margin: 0 auto; width:70%"> 

   
    <a href="" style="color:#ff3399;font-family:segoe print; text-align: center; font-size:30px; float:left">
    Hello <span>{{userName==null|| userName ==""?"guest":userName}}, welcome!</span></a>


 
</div>

<div> <a href="./Login" style="font-size:22px; color:white; float:right; padding:5px" id="loginBtn">Login</a>
<button (click)="logout()" style="font-size:22px; color:white; float:right; padding:5px;background-color:black; border:black; cursor:pointer" id="logoutBtn">Logout</button>
</div>

`

})

export class AppHeader implements OnInit{
   
        public userName: string;
        constructor(public authService:AuthService,  private route: Router, private location:Location){

            
               authService.s_userInfo.subscribe(userinfo=>{
               //     alert(userinfo.name);
               // $("#username").text(userinfo.name);
            
                 this.userName = userinfo.name;

                 localStorage.setItem("chenplayground", this.userName);
                });
             

        
        }
        logout()
        {
            
                 localStorage.setItem("chenplayground","");
                 window.location.reload();
             
        }
        ngOnInit(){
               
                this.userName = localStorage.getItem("chenplayground");
             
                if(this.userName !=null && this.userName!=""){ //logged in
                        $("#loginBtn").hide();
                        $("#logoutBtn").show();
                }
                else{
                        //logged out

                        $("#loginBtn").show();
                        $("#logoutBtn").hide();
                }

                   if(this.userName == ""){
                   this.userName="guest";
                }
                
        }

}