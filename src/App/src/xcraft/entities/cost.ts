export class Cost {
    constructor(public metal?: number, public crystal?: number, public deuterium?: number) {
        this.metal = metal || 0;
        this.crystal = crystal || 0;
        this.deuterium = deuterium || 0;
    }

    add(another: Cost): Cost {
        return new Cost(
            this.metal + another.metal,
            this.crystal + another.crystal,
            this.deuterium + another.deuterium,
        );
    }

    sub(another: Cost): Cost {
        return new Cost(
            this.metal - another.metal,
            this.crystal - another.crystal,
            this.deuterium - another.deuterium
        );
    }

    mul(times: number): Cost {
        return new Cost(
            this.metal * times,
            this.crystal * times,
            this.deuterium * times
        )
    }

    toUnires(): number {
        return this.metal / 4 + this.crystal / 2 + this.deuterium;
    }

    toPoints(): number {
        return this.toUnires() / 1000;
    }
}