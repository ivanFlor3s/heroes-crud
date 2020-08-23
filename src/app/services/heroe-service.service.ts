import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroeServiceService {

  constructor() { }

  matarHeroe( heroe: HeroeModel){
    heroe.vivo = false;
  }
}
