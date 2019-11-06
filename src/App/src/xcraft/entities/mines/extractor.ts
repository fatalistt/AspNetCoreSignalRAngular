import { Mine, MineOptions } from './mine';

export class Extractor extends Mine {
    static readonly id = 53;

    protected internalIncome(options: MineOptions): number {
        if (!Number.isInteger(options.planetOptions.maximumTemperature))
            throw new Error("maximumPlanetTemperature must be integer");

        return Math.floor(6 * options.level * 1.1 ** options.level * (1.36 - 0.003 * options.planetOptions.maximumTemperature));
    }
}
