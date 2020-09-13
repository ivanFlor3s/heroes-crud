import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroeServiceService {

  url = 'https://login-app-f9a7a.firebaseio.com';

  constructor( private http: HttpClient) {
  }
  crearHeroe( heroe: HeroeModel) {
    return this.http.post(`${ this.url }/heroes.json`, heroe).
      pipe(
        map( (resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  getHeroe( id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  actualizarHeroe( heroe: HeroeModel){
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${ this.url }/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
        map( this.crearArreglo )
      );
  }

  private crearArreglo( heroesObject: Object ){
    const heroesLista: HeroeModel[] = [];

    Object.keys(heroesObject).forEach(key => {
      const heroe: HeroeModel = heroesObject[key];
      heroe.id = key;

      heroesLista.push(heroe);
    });
    return heroesLista;
  }
}
