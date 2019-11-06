import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Mine, PlanetType } from '../entities/mines/mine';
import { MineFactory } from '../entities/mines/mine-factory';
import { GasLake } from '../entities/mines/gas-lake';
import { Extractor } from '../entities/mines/extractor';
import { Utils } from '../utils';

@Component({
  selector: '[xcraft-mine]',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MineComponent implements OnInit {
  @Input("mine") mineControl: FormGroup;
  @Input() form: FormGroup;
  private mine: Mine;
  private extractor: Extractor;
  private tempControl: AbstractControl;
  private diameterControl: AbstractControl;
  private planetTypeControl: AbstractControl;
  private levelControl: AbstractControl;
  private extractorControl: AbstractControl;
  private incomeControl = new FormControl();
  private upgradeIncomeControl = new FormControl();
  private paybackControl = new FormControl();

  ngOnInit(): void {
    this.setControls();
    this.createMine();
    if (this.mine instanceof GasLake) {
      this.setExtractor();
    }
    // this.paybackControl.setValue
    this.updateValues();
    this.mineControl.addControl("upgradeIncome", this.upgradeIncomeControl);
    this.mineControl.addControl("income", this.incomeControl);
    this.mineControl.addControl("payback", this.paybackControl);
    this.setHandlers();
  }

  private setControls(): void {
    this.tempControl = this.form.get("maximumTemperature");
    this.diameterControl = this.form.get("diameter");
    this.planetTypeControl = this.form.get("type");
    this.levelControl = this.mineControl.get("level");
  }

  private createMine(): void {
    this.mine = MineFactory.createMine(this.mineControl.get("mine").value.id, {
      level: this.levelControl.value,
      planetOptions: {
        diameter: this.diameterControl.value,
        maximumTemperature: this.tempControl.value,
        type: PlanetType[this.planetTypeControl.value] as unknown as PlanetType
      }
    });
  }

  private setExtractor(): void {
    this.extractorControl = (this.form.get("mines") as FormArray).controls.find(control => control.get("mine").value.id === Extractor.id);
    if (this.extractorControl === null)
      throw new Error("There is no extractor in form!");
    this.extractor = new Extractor({
      level: this.extractorControl.get("level").value,
      planetOptions: this.mine.options.planetOptions
    });
    this.mine.options.hourlyExtractorProduction = this.extractor.getCurrentIncome();
  }

  private setHandlers(): void {
    this.levelControl.valueChanges.subscribe(newLevel => {
      if (newLevel === null || newLevel < 0)
        return;
      this.mine.options.level = newLevel;
      this.updateValues();
    });
    this.tempControl.valueChanges.subscribe(newTemp => {
      if (newTemp === null)
        return;
      this.mine.options.planetOptions.maximumTemperature = newTemp;
      if (this.extractorControl !== undefined) {
        this.extractor.options.planetOptions.maximumTemperature = newTemp;
        this.mine.options.hourlyExtractorProduction = this.extractor.getCurrentIncome();
      }
      this.updateValues();
    });
    this.diameterControl.valueChanges.subscribe(newDiameter => {
      if (newDiameter === null || newDiameter <= 0)
        return;
      this.mine.options.planetOptions.diameter = newDiameter;
      this.updateValues();
    });
    this.planetTypeControl.valueChanges.subscribe(newType => {
      this.mine.options.planetOptions.type = PlanetType[newType] as unknown as PlanetType;
      this.updateValues();
    });
    if (this.extractorControl !== undefined) {
      this.extractorControl.get("level").valueChanges.subscribe(newLevel => {
        if (newLevel === null || newLevel < 0)
          return;
        this.extractor.options.level = newLevel;
        this.mine.options.hourlyExtractorProduction = this.extractor.getCurrentIncome();
        this.updateValues();
      });
    }
  }

  private updateValues(): void {
    Intl.NumberFormat()
    const format: Intl.NumberFormatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
    this.incomeControl.setValue(this.mine.getCurrentIncome().toLocaleString(undefined, format));
    this.upgradeIncomeControl.setValue(this.mine.getUpgradeIncome().toLocaleString(undefined, format));
    const paybackHours = Utils.parseLocaleNumber(this.mineControl.get("upgradeCost").value) / Utils.parseLocaleNumber(this.upgradeIncomeControl.value);
    const paybackDays = paybackHours / 24;
    this.paybackControl.setValue(paybackDays.toLocaleString(undefined, format));
  }
}
