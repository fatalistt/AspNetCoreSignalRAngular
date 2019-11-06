import { Mine, MineOptions } from './mine';

export class RectificationTunnel extends Mine {
    protected internalIncome(options: MineOptions): number {
        const metalIncome = Math.floor(12 * options.level * 1.09 ** options.level);
        const mineralIncome = Math.floor(2 * options.level * 1.09 ** options.level);

        return metalIncome / 4 + mineralIncome / 2;
    }
}
