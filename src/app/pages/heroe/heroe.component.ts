import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroeServiceService } from '../../services/heroe-service.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  forma: FormGroup;

  heroe = new HeroeModel();

  constructor( private fb: FormBuilder, private heroeService: HeroeServiceService ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }
  get heroeVivo(){
    return this.forma.get('vivo').value;
  }

  crearFormulario(){
    this.forma = this.fb.group( {
      firebaseId: [],
      nombre: [],
      poder: [],
      vivo: [true],
    });
  }

  guardar(){
    if (this.forma.invalid) {
      console.log('Formulario no es valido');
      return ;
    }
    console.log('Disparar Submmit');
    console.log(this.forma);
    }
}
