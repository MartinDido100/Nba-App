import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbaService } from '../../services/nba.service';
import { PlayerResponse } from '../../interfaces/nba.interfaces';
import { ValidationsService } from '../../../auth/services/validations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('openCloseModal',[
      state('open', style({
        visibility: 'visible',
        opacity: 1
      })),
      state('close', style({
        visibility: 'hidden',
        opacity: 0
      })),

      transition('close => open', [
        animate('0.1s ease-in')
      ]),
      transition('open => close', [
        animate('0.1s ease-out')
      ]),

    ])
  ]
})
export class HomeComponent implements OnInit {

  modalListenFunction!: () => void;

  addForm: FormGroup = this.fB.group({
    nombre: ['',[Validators.required]],
    equipo: ['',[Validators.required,Validators.minLength(3)]],
    edad: ['18',[Validators.required,Validators.min(18),Validators.max(100)]],
    titulos: ['0',[Validators.required,Validators.min(0)]],
    imagen: ['']
  })

  abrirModal: boolean = false;
  modalError: string = '';
  sent: boolean = false

  constructor(private aS : AuthService,
              private fB: FormBuilder,
              private nS: NbaService,
              private vS: ValidationsService,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.aS.getPlayersFavs().subscribe();
  }

  get stateName(): string {
    return this.abrirModal ? 'open' : 'close'
  }

  toggleModal(){
    this.abrirModal = !this.abrirModal;
    if(this.abrirModal){
       this.modalListenFunction = this.renderer.listen('document','keyup.escape',()=>{
          this.abrirModal = false;
          this.modalListenFunction();
      })
    }
  }

  validarCampo(campo: string,error:string){
    return this.vS.validateField(campo,this.addForm,error);
  }

  changeValues(sentValue: boolean){
    this.sent = sentValue;
    this.addForm.reset({
      edad: '18',
      titulos:'0'
    });
  }

  addPlayer(){
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched();
      this.sent = true;
      return;
    }

    const { nombre,equipo,edad,titulos, imagen } = this.addForm.value;
    this.nS.addPlayer(nombre,equipo,edad,titulos,imagen).subscribe((resp: PlayerResponse) => {
      if(!resp.ok){
        this.changeValues(false);
        this.modalError = resp.msg || '';
        return;
      }
      this.changeValues(false)
      this.modalError = '';
      this.abrirModal = false;
    })
  }

  

}
