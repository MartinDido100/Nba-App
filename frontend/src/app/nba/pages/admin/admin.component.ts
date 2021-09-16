import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/auth.interfaces';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  errorMsg: string = '';
  successMsg: string = '';

  formulario: FormGroup = this.fB.group({
    username: ['',[Validators.required]],
    role: ['',[Validators.required]]
  })

  get userData(): Usuario{
    return this.aS.user;
  }

  roles: string[] = [
    'moderator',
    'user'
  ]

  constructor(private fB: FormBuilder,
              private aS: AuthService) { }

  ngOnInit(): void {
  }

  changeRole(){
    if(this.formulario.invalid){
      return;
    }
    const email = this.userData.email;
    const { username, role } = this.formulario.value
    this.aS.changeRole(email,username,role).subscribe(
      (resp) => {
        if(resp.ok){
          this.successMsg = resp.msg
          this.errorMsg = '';
          return;
        }
        this.errorMsg = resp.msg;
        this.successMsg = '';
      }
    );
    this.formulario.reset();
  }

}
