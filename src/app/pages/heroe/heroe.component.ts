import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroeServiceService } from '../../services/heroe-service.service';

import  Swal  from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  forma: FormGroup;

  heroe = new HeroeModel();

  constructor( private fb: FormBuilder,
               private heroeService: HeroeServiceService,
               private router: ActivatedRoute ) {
    this.crearFormulario();
  }

  ngOnInit(): void {

   const id = this.router.snapshot.paramMap.get('id');

   if ( id !== 'nuevo'){
    this.heroeService.getHeroe(id).subscribe( (resp: HeroeModel) => {
      this.heroe = resp;
      this.heroe.id = resp.id;
      console.log(this.heroe);
    });
    //TODO Corregir el Form para que tome los valores del heroe cuando alguien entra desde el boton de Edit
    this.forma.controls['firebaseId'].setValue(this.heroe.id);
    this.forma.controls['nombre'].setValue(this.heroe.nombre);
    this.forma.controls['poder'].setValue(this.heroe.poder);
    this.forma.controls['vivo'].setValue(this.heroe.vivo);
   }
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
  get heroeId(){
    return this.forma.get('firebaseId').value;
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

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    if ( this.heroeId ){
      this.heroeService.actualizarHeroe( this.heroe ).
      subscribe(resp => {
        console.log(resp);
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizo correctamente',
          icon: 'success'
        });
      });
    } else {
      this.heroeService.crearHeroe( this.heroe ).
      subscribe(resp => {
        this.forma.controls['firebaseId'].setValue(resp.id);
        console.log(resp);
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizo correctamente',
          icon: 'success'
        });
      });
    }

   }
}
