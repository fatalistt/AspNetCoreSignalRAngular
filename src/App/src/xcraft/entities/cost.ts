export class Cost {
    constructor(public metal: number, public crystal: number, public deuterium: number) {
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
}