import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player, PlayerResponse } from '../../interfaces/nba.interfaces';
import { ValidationsService } from '../../../auth/services/validations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  sent: boolean = false;
  modalError: string = '';
  playerId: string = '';
  playerName: string = '';

  editForm: FormGroup = this.fB.group({
    nombre: ['',[Validators.required]],
    equipo: ['',[Validators.required,Validators.minLength(3)]],
    edad: ['',[Validators.required,Validators.min(18),Validators.max(100)]],
    titulos: ['',[Validators.required,Validators.min(0)]],
    imagen: ['', [Validators.required] ]
  })




  constructor(private fB: FormBuilder,
              private vS: ValidationsService,
              private activatedRoute: ActivatedRoute,
              private nS: NbaService,
              private router: Router) { }
          


  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      switchMap(({name}) => this.nS.getPlayer(name))
    ).subscribe( resp=> {
      this.editForm.reset({
        nombre: resp.name,
        equipo: resp.team,
        edad: resp.age,
        titulos: resp.titles,
        imagen: resp.img
      });
      this.playerId = resp._id;
      this.playerName = resp.name;
    })

  }

  validarCampo(campo: string, error: string){
    return this.vS.validateField(campo,this.editForm,error);
  }

  editPlayer(){
    
    if(this.editForm.invalid){
      console.log(this.editForm);
      this.editForm.markAllAsTouched();
      this.sent = true;
      return;
    }

    const { nombre,equipo,edad,titulos, imagen } = this.editForm.value;

    this.nS.editPlayer(nombre,equipo,edad,titulos, imagen,this.playerId ).subscribe((resp: PlayerResponse)=>{
      console.log(resp)
      if(!resp.ok){
        this.sent = false;
        this.modalError = resp.msg || '';
        return;
      }
      this.sent = false;
      this.modalError = '';
      this.router.navigateByUrl('/nba');
    })


  }

}
