import { Cost } from './cost';

export class Building {
    private _level: number;

    constructor(public id: number, public firstLevelCost: Cost, public multiplier: number, public name: string, level?: number) {
        this.level = level || 0;
    }

    set level(newLevel: number) {
        if (newLevel < 0)
            throw new Error(`Level must be positive integer. Given: ${newLevel}`);
        this._level = newLevel;
    }

    get level(): number {
        return this._level;
    }

    get cost(): Cost {
        if (this.level === 0)
            return new Cost();
        else
            return this.getTotalCostBetweenLevels(this.level - 1, this.level);
    }

    get totalCost(): Cost {
        return this.getTotalCostBetweenLevels(0, this.level);
    }

    get upgradeCost(): Cost {
        return this.getTotalCostBetweenLevels(this.level, this.level + 1);
    }

    private getTotalCostBetweenLevels(first: number, second: number): Cost {
        if (first < 0 || second < 0 || !Number.isInteger(first) || !Number.isInteger(second))
            throw new Error(`Levels must be positive integers. Given: (${first}, ${second}`);
        const max = Math.max(first, second);
        const min = Math.min(first, second);
        let count = max - min;
        let multiplier = this.multiplier ** min;
        const res = new Cost();
        while (count--) {
            res.metal += Math.floor(this.firstLevelCost.metal * multiplier);
            res.crystal += Math.floor(this.firstLevelCost.crystal * multiplier);
            res.deuterium += Math.floor(this.firstLevelCost.deuterium * multiplier);
            multiplier *= this.multiplier;
        }
        return res;
    }
}