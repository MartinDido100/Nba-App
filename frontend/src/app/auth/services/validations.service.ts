import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  validateField(field: string, form: FormGroup,error: string):boolean | undefined{
    return form.get(field)?.hasError(error);
  }

  comparePasswords( pass1: string, pass2: string ){

    return ( formGroup: AbstractControl ) => {
        const password1 = formGroup.get(pass1);
        const password2 = formGroup.get(pass2);

        if(password2?.errors && password2.errors.noIguales){
          return;
        }

        if(password1?.value !== password2?.value){
          password2?.setErrors({noIguales: true});
          return {
            noIguales: true
          }
        }

        formGroup.get(pass2)?.setErrors(null);
        return null
    }

  }

  constructor() { }
}
