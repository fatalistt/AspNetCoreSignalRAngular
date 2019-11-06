import { Mine, MineOptions } from './mine';

export class Incubator extends Mine {
    protected internalIncome(options: MineOptions): number {
        const metalIncome = Math.floor(6 * options.level * 1.09 ** options.level);
        const mineralIncome = Math.floor(18 * options.level * 1.09 ** options.level);

        return metalIncome / 4 + mineralIncome / 2;
    }
}
