import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MinesService } from '../mines.service';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xcraft-mines',
  templateUrl: './mines.component.html',
  styleUrls: ['./mines.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MinesComponent implements OnInit {
  form: FormGroup;

  constructor(private service: MinesService) {
  }

  ngOnInit(): void {
    const mines = this.service.getAllMines();
    this.form = new FormGroup({
      mines: this.service.toFromArray(mines),
      diameter: new FormControl(1, Validators.min(1)),
      maximumTemperature: new FormControl(0),
      type: new FormControl("Gas"),
    });
  }

  get mines(): FormArray {
    return this.form.controls["mines"] as FormArray;
  }
}
