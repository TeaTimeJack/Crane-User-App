
export interface LiftingEquipment {
    type: string ;
    angle: number; // Represents the lifting angle/factor
    WLL: number;  // Working Load Limit
}

 abstract class Equipment implements LiftingEquipment {
    type:string ;
    angle: number;
    WLL: number = 0; 

    constructor(type: string, angle: number) {
        this.type = type;
        this.angle = angle;
    }
}


export class Chain extends Equipment {
    width: number;
    numOf: number;

    constructor(type:string ="chain", width:number=10, numOf: number=1, angle:number = 1) {
        super(type , angle);

        this.width = width;
        this.numOf = numOf;
        this.WLL = (this.width * this.width) * 30 * this.angle;
    }
}

export class Strap extends Equipment {
    strength: number;
    numOf: number;
    knotType: number;

    constructor(type: string= "strap", strength:number=1000, numOf:number=1, angle:number=1, knotType:number=1) {
        super(type, angle);

        this.strength = strength;
        this.numOf = numOf;
        this.knotType = knotType;
        this.WLL = this.strength * this.knotType * this.numOf * this.angle;
    }
}

export class Cable extends Equipment {
    width: number;
    nunOfCables: number;
    cableEnding: number; 

    constructor(type:string ="cable", width:number=10, nunOfCables:number=1, angle: number=1, cableEnding:number=0) {
        super(type, angle);

        this.width = width;
        this.nunOfCables = nunOfCables;
        this.cableEnding = cableEnding;
        this.WLL = this.width * this.width * 10 * this.angle * (1 - this.cableEnding);
    }
}