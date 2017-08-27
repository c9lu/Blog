import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import {AuthService} from './AuthenticationService';
import { Http, Response } from '@angular/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BlogAppRoutes} from './AppRoutes';
import {User} from './user';
import * as $ from 'jquery';
import {FormGroup, ReactiveFormsModule, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
//http://4dev.tech/2016/03/login-screen-and-authentication-with-angular2/
@Component({
  selector: 'app-login',
  templateUrl: './app/login.component.html',
  styleUrls: ['./app/login.component.css']
  
})

export class LoginComponent{

  @Output() userInfo = new EventEmitter()
  public loginForm: FormGroup;
  public registerForm :FormGroup;
  public message:string;
  user: User;
  public returnURL:string;
  public ValidAccount: Boolean = true;
 // @Out
 attemptSubmit = 0;
 
  constructor(private route: Router, private location: Location, private authService: AuthService, private formBuilder: FormBuilder){

        this.user = new User();
            
  }

  validateEmail(email:FormControl){
     var EMAIL_FORMAT = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

     if(email.value!="" && EMAIL_FORMAT.test(email.value)){
         return null;
     }
     else{
         return {validateEmail:false};
     }
  }
  ngOnInit(){
    var _self = this;
        _self.loginForm = new FormGroup({
          //  input:''
                   input: new FormControl('', Validators.required)//Validators.required]

      });
      _self.registerForm = _self.formBuilder.group({
            email: new FormControl('', [this.validateEmail, Validators.required]),
            name: new FormControl('', Validators.required)

      });
     
            $("#loader").hide();

           $("#loginBtn").hide();
            //this.returnURL= this.router.snapshot.queryParams['returnUrl'] || '/';

  }
    get diagnostic() { return JSON.stringify(this.user); }

get input() { return this.loginForm.get('input'); }
get email() {return this.registerForm.get('email');}
get name() {return this.registerForm.get('name');}
 public register(){

        //alert('hi');
        var _self = this;
        _self.attemptSubmit = 2;
        if(_self.registerForm.controls["email"].valid==false){

            return ;
        }

        var _email = _self.registerForm.get('email');
        var _name = _self.registerForm.get('name');

        if(_email==null || _email.value == "" || _name==null || _name.value ==""){

            _self.message="Please enter your email and name to register."
        }
        else
        {
        var user = {email:_email.value, name:_name.value};


        _self.authService.register(user).subscribe(
            response=>{

               return _self.authService.login(user.name).subscribe(function(){

                   window.location.assign('./');
               });
                 
            }

        );
        }
 }
  
 public login()
  {

     // let body = {username, email};

     this.attemptSubmit = 1;
     if(this.loginForm.valid==false){

         return;
     }
    var _self= this;
    _self.authService.login(_self.loginForm.get('input').value).subscribe(
                    response =>{
                        var user = response;
                        
                        if(user == null){
                          _self.message = _self.loginForm.get('input').value + " is not found in the database, you need to register first."
                            
                            _self.ValidAccount = false;

                            $("#loginpanel").hide();

                          
                            
                        }

                        else{

                     

                            _self.user.email = response.email;
                            _self.user.name = response.name;

                            _self.ValidAccount = true;

                            this.userInfo.emit(_self.user);
                          
                            _self.location.back();
                            //this.route.navigate(['./'])
                        }
                    }

        );
        

      
  }
}
