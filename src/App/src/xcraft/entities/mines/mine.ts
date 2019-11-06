export interface MineOptions {
    level: number;
    planetOptions: PlanetOptions;
    hourlyExtractorProduction?: number;
}

export interface PlanetOptions {
    maximumTemperature: number;
    diameter: number;
    type: PlanetType;
}

export abstract class Mine {
    constructor(public options: MineOptions) {
    }

    getCurrentIncome(options?: MineOptions): number {
        const selectedOptions = options || this.options;
        if (!Number.isInteger(selectedOptions.level) || selectedOptions.level < 0)
            throw new Error("Level must be nonnegative integer");
        return this.internalIncome(selectedOptions);
    }

    getUpgradeIncome(): number {
        const currentIncome = this.getCurrentIncome();
        const newOptions: MineOptions = {
            level: this.options.level + 1,
            planetOptions: this.options.planetOptions,
            hourlyExtractorProduction: this.options.hourlyExtractorProduction
        };
        const nextIncome = this.getCurrentIncome(newOptions);
        return nextIncome - currentIncome;
    }

    protected abstract internalIncome(options: MineOptions): number;
}

export enum PlanetType {
    Gas,
    Sand,
    Water,
    Normal,
    Dry,
    Ice,
    Jungle
}
