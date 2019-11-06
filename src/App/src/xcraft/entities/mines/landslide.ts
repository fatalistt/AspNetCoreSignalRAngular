import { Mine, MineOptions } from './mine';

export class Landslide extends Mine {
    protected internalIncome(options: MineOptions): number {
        if (!Number.isInteger(options.planetOptions.diameter) || options.planetOptions.diameter <= 0)
            throw new Error("planetDiameter must be positive integer");

        const metalIncome = Math.floor(1000 * options.level * 1.1 ** options.level / options.planetOptions.diameter ** 0.125);
        const mineralIncome = Math.floor(500 * options.level * 1.1 ** options.level / options.planetOptions.diameter ** 0.125);

        return metalIncome / 4 + mineralIncome / 2;
    }
}
