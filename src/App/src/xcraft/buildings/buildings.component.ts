import { Component, ViewEncapsulation } from '@angular/core';
import { Building } from '../entities/building';
import { Cost } from '../entities/cost';

@Component({
  selector: 'xcraft-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BuildingsComponent {
  buildings: Building[] = [
    new Building(51, new Cost(50, 5, 0), 1.6, "Инкубатор"),
    new Building(52, new Cost(10, 40, 0), 1.5, "Очистительный канал"),
    new Building(53, new Cost(185, 55, 0), 1.45, "Экстрактор"),
    new Building(58, new Cost(40, 20, 10), 1.25, "Нора металла"),
    new Building(68, new Cost(20, 30, 10), 1.25, "Нора минерала"),
    new Building(70, new Cost(20, 10, 20), 1.25, "Нора газа"),
  ]
}
