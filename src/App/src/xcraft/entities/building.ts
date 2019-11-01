import { Cost } from './cost';

export class Building {
    constructor(public id: number, public firstLevelCost: Cost, public multiplier: number, public name: string) {
    }

    getLevelCost(level: number): Cost {
        if (level <= 0 || !Number.isInteger(level))
            throw new Error(`Level must be positive integer. Given: ${level}`);
        return this.getTotalCostBetweenLevels(level, level);
    }

    getTotalLevelCost(level: number): Cost {
        if (level <= 0 || !Number.isInteger(level))
            throw new Error(`Level must be positive integer. Given: ${level}`);
        return this.getTotalCostBetweenLevels(1, level);
    }

    getTotalCostBetweenLevels(first: number, second: number): Cost {
        if (first <= 0 || second <= 0 || !Number.isInteger(first) || !Number.isInteger(second))
            throw new Error(`Levels must be positive integers. Given: (${first}, ${second}`);
        const max = Math.max(first, second);
        const min = Math.min(first, second);
        let count = max - min + 1;
        let multiplier = this.multiplier ** (min - 1);
        const res = new Cost(0, 0, 0);
        while (count--) {
            res.metal += Math.floor(this.firstLevelCost.metal * multiplier);
            res.crystal += Math.floor(this.firstLevelCost.crystal * multiplier);
            res.deuterium += Math.floor(this.firstLevelCost.deuterium * multiplier);
            multiplier *= this.multiplier;
        }
        return res;
    }

    getUniresAtLevel(level: number): number {
        if (level <= 0 || !Number.isInteger(level))
            throw new Error(`Level must be positive integer. Given: ${level}`);
        const cost = this.getLevelCost(level);
        return (cost.metal / 4 + cost.crystal / 2 + cost.deuterium);
    }

    getTotalUniresAtLevel(level: number): number {
        if (level <= 0 || !Number.isInteger(level))
            throw new Error(`Level must be positive integer. Given: ${level}`);
        const cost = this.getTotalLevelCost(level);
        return (cost.metal / 4 + cost.crystal / 2 + cost.deuterium);
    }

    getPointsAtLevel(level: number): number {
        if (level <= 0 || !Number.isInteger(level))
            throw new Error(`Level must be positive integer. Given: ${level}`);
        return this.getUniresAtLevel(level) / 1000;
    }

    getTotalPointsAtLevel(level: number): number {
        if (level <= 0 || !Number.isInteger(level))
            throw new Error(`Level must be positive integer. Given: ${level}`);
        return this.getTotalUniresAtLevel(level) / 1000;
    }
}