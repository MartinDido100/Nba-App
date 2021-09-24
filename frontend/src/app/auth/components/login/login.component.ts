import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from '../../services/validations.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() onCrossClicked: EventEmitter<string> = new EventEmitter();
  loginError: string = ''
  touchedButton: boolean = false
  cargando: boolean = false;

  loginForm: FormGroup = this.fB.group({
    username: ['', [ Validators.required]],
    password: ['',[Validators.required]]
  })

  constructor(private fB: FormBuilder,
              private vS: ValidationsService,
              private aS: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargando = false;
  }

  validate(field:string,error: string){

    return this.vS.validateField(field,this.loginForm,error);

  }

  login(){
    this.touchedButton = true;
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    this.cargando = true;

    const { username, password } = this.loginForm.value;

    this.aS.loginUser(username,password).subscribe(
      (ok: boolean)=> {
        if(ok){
          this.router.navigateByUrl('/nba');
        }
      },
      (err : HttpErrorResponse) => this.loginError = err.error.msg
    )

  }

}
