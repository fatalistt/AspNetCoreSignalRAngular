import { Mine, MineOptions } from './mine';

export class GasLake extends Mine {
    protected internalIncome(options: MineOptions): number {
        if (Number.isNaN(options.hourlyExtractorProduction) || options.hourlyExtractorProduction < 0)
            throw new Error("hourlyExtractorProduction must be nonnegative number");

        return Math.floor(options.level ** 1.1 * Math.sqrt(options.hourlyExtractorProduction));
    }
}
