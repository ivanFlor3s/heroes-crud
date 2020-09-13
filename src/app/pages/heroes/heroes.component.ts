import { Component, OnInit } from '@angular/core';
import { HeroeServiceService } from '../../services/heroe-service.service';
import { HeroeModel } from '../../models/heroe.model';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor( private heroesService: HeroeServiceService) {
   }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe( resp => {
        this.heroes = resp;
      });
  }

}
