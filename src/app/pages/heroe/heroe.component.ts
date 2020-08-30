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
  get isAlive(){
    return this.forma.get('vivo').value;
  }
  get heroeNombre(){
    return this.forma.get('nombre').value;
  }
  get heroePoder(){
    return this.forma.get('poder').value;
  }

  crearFormulario(){
    this.forma = this.fb.group( {
      firebaseId: [],
      nombre: [, Validators.required],
      poder: [, Validators.required],
      vivo: [true],
    });
  }

  heroeVivo(){
    this.forma.controls['vivo'].setValue(true);
    console.log(this.isAlive);
  }
  heroeMuerto(){
    this.forma.controls['vivo'].setValue(false);
    console.log(this.isAlive);
  }

  guardar(){
    if (this.forma.invalid) {
      console.log('Formulario no es valido');
      return ;
    }

    this.heroe.nombre = this.heroeNombre;
    this.heroe.poder = this.heroePoder;
    this.heroe.vivo = this.isAlive;

    this.heroeService.crearHeroe( this.heroe ).
      subscribe(resp => {
        this.forma.controls['firebaseId'].setValue(resp.id);
        console.log(resp);
      });
    }
}
