import { Mine, MineOptions, PlanetType } from './mine';

export class MineralHole extends Mine {
    protected internalIncome(options: MineOptions): number {
        if (PlanetType[options.planetOptions.type] === undefined)
            throw new Error(`Unknown planetType: ${options.planetOptions.type}`);

        let income = 16 * options.level * 1.025 ** options.level;
        if (options.planetOptions.type === PlanetType.Water)
            income *= 1.2;

        return Math.floor(income) / 2;
    }
}

