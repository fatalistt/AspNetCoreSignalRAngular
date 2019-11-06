import { Injectable } from '@angular/core';
import { Building } from './entities/building';
import { Cost } from './entities/cost';
import { FormControl, FormGroup, FormArray, AbstractControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MinesService {
  private readonly mines: Building[] = [];

  constructor() {
    //Take it from indexedDB first. Then update costs and multipliers if needed
    this.mines = [
      new Building(51, new Cost(50, 5, 0), 1.6, 'Инкубатор'),
      new Building(52, new Cost(10, 40, 0), 1.5, 'Очистительный канал'),
      new Building(53, new Cost(185, 55, 0), 1.45, 'Экстрактор'),
      new Building(58, new Cost(40, 20, 10), 1.25, 'Нора металла'),
      new Building(68, new Cost(20, 30, 10), 1.25, 'Нора минерала '),
      new Building(70, new Cost(20, 10, 20), 1.25, 'Нора газа'),
      new Building(64, new Cost(5000000, 3000000, 0), 1.5, 'Оползень'),
      new Building(65, new Cost(1000000, 2000000, 0), 1.5, 'Газовое озеро'),
    ]
  }

  getAllMines(): Building[] {
    return this.mines.slice();
  }

  toFromArray(mines: Building[]): FormArray {
    const array: AbstractControl[] = [];

    const format: Intl.NumberFormatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    mines.forEach(mine => {
      const mineGroup = {
        mine: new FormControl(mine),
        level: new FormControl(mine.level, Validators.min(0)),
        cost: new FormControl(mine.cost.toUnires().toLocaleString(undefined, format)),
        upgradeCost: new FormControl(mine.upgradeCost.toUnires().toLocaleString(undefined, format))
      };
      mineGroup.level.valueChanges.subscribe(level => {
        if (level === null || level < 0)
          return;
        const mine = (mineGroup.mine.value as Building);
        mine.level = level;
        mineGroup.cost.setValue(mine.cost.toUnires().toLocaleString(undefined, format));
        mineGroup.upgradeCost.setValue(mine.upgradeCost.toUnires().toLocaleString(undefined, format));
      })
      array.push(new FormGroup(mineGroup));
    });

    return new FormArray(array);
  }
}
