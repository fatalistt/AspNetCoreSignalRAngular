import { Incubator } from './incubator';
import { RectificationTunnel } from './rectification-tunnel';
import { Extractor } from './extractor';
import { MetalHole } from './metal-hole';
import { MineralHole } from './mineral-hole';
import { VespeneHole } from './vespene-hole';
import { Landslide } from './landslide';
import { GasLake } from './gas-lake';
import { Mine, MineOptions } from './mine';

export class MineFactory {
    static createMine(id: number, options: MineOptions): Mine {
        switch (id) {
            case 51: return new Incubator(options);
            case 52: return new RectificationTunnel(options);
            case 53: return new Extractor(options);
            case 58: return new MetalHole(options);
            case 68: return new MineralHole(options);
            case 70: return new VespeneHole(options);
            case 64: return new Landslide(options);
            case 65: return new GasLake(options);
            default: throw new Error(`Unknown mine id: ${id}`);
        }
    }
}
