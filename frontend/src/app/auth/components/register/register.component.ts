import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from '../../services/validations.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public touchedButton: boolean = false;

  registerForm: FormGroup = this.fB.group({
    username: ['', [ Validators.required]],
    email: ['', [ Validators.required,Validators.pattern(this.vS.emailPattern)]],
    password1: ['',[Validators.required,Validators.minLength(6)]],
    password2: ['',[Validators.required]]
  },{
    validators: [this.vS.comparePasswords('password1','password2')]
  })

  constructor(private fB: FormBuilder,
              private vS: ValidationsService,
              private aS: AuthService,
              private router: Router) { }

  validate(field: string,error: string){

    return this.vS.validateField(field,this.registerForm,error);

  }


  ngOnInit(): void {
  }

  register() { 
    this.touchedButton = true;
    if(this.registerForm.invalid){
      return;
    }
    
    const { username, email, password1 } = this.registerForm.value;

    this.aS.registerUser(username,email,password1).subscribe(
      (ok: boolean) => {
        if(ok){
          this.router.navigateByUrl('/nba');
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error.msg);
      }
    );

  }

}
