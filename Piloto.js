const { validate } = require("bycontract");

class Aeronave {
    #prefixo;
    #tipo;
    #velocidadeCruzeiro;
    #autonomia;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia) {
        validate(arguments, ["string", "string", "number", "number"]);
        if (velocidadeCruzeiro <= 0) {
            throw new Error(`Velocidade inválida: ${velocidadeCruzeiro}`);
        } else if (autonomia <= 0) {
            throw new Error(`Autonomia inválida: ${autonomia}`);
        }
        this.#prefixo = prefixo;
        this.#tipo = tipo;
        this.#velocidadeCruzeiro = velocidadeCruzeiro;
        this.#autonomia = autonomia;
    }

    get prefixo() {
        return this.#prefixo;
    }

    get tipo() {
        return this.#tipo;
    }

    get velocidadeCruzeiro() {
        return this.#velocidadeCruzeiro;
    }

    get autonomia() {
        return this.#autonomia;
    }

    toString() {
        let str = `Prefixo: ${this.prefixo}; Tipo: ${this.tipo}; `;
        str += `Velocidade de cruzeiro: ${this.velocidadeCruzeiro}km/h; `;
        str += `Autonomia: ${this.autonomia}km;`;
        return str;
    }
}

class AeronavePequenoPorte extends Aeronave {
    #empresaManutencao;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia, empresaManutencao) {
        validate(arguments, ["string", "string", "number", "number", "string"]);
        super(prefixo, tipo, velocidadeCruzeiro, autonomia);
        this.#empresaManutencao = empresaManutencao;
    }

    toString() {
        return super.toString() + ` Responsável pela manutenção: ${this.#empresaManutencao};`;
    }
}

class AeronaveComercial extends Aeronave {
    #nomeCiaAerea;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea) {
        validate(arguments, ["string", "string", "number", "number", "string"]);
        super(prefixo, tipo, velocidadeCruzeiro, autonomia);
        this.#nomeCiaAerea = nomeCiaAerea;
    }

    toString() {
        return super.toString() + ` Companhia Aérea: ${this.#nomeCiaAerea};`;
    }
}

class AeronaveComercialPassageiros extends AeronaveComercial {
    #maxPassageiros;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea, maxPassageiros) {
        validate(arguments, ["string", "string", "number", "number", "string", "number"]);
        if (maxPassageiros <= 0) {
            throw new Error(`Quantidade inválida: ${maxPassageiros}`);
        }
        super(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea);
        this.#maxPassageiros = maxPassageiros;
    }

    toString() {
        return super.toString() + ` Quantidade máxima de passageiros: ${this.#maxPassageiros};`;
    }
}

class AeronaveComercialCarga extends AeronaveComercial {
    #pesoMax;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea, pesoMax) {
        validate(arguments, ["string", "string", "number", "number", "string", "number"]);
        if (pesoMax <= 0) {
            throw new Error(`Peso inválido: ${pesoMax}`);
        }
        super(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea);
        this.#pesoMax = pesoMax;
    }

    toString() {
        return super.toString() + ` Carga máxima: ${this.#pesoMax}kg;`;
    }
}

let aviao = new Aeronave("VVV", "carga", 500, 50);
let aviao2 = new AeronavePequenoPorte("BBB", "particular", 888, 80, "conserta-aviao");
let aviao3 = new AeronaveComercial("CCC", "passageiros", 500, 80, "supertam");
let aviao4 = new AeronaveComercialPassageiros("AAA", "passageiros", 500, 50, "supertam", 100);
let aviao5 = new AeronaveComercialCarga("DDD", "carga", 600, 100, "supercargo", 1000);

console.log(aviao.toString());
console.log(aviao2.toString());
console.log(aviao3.toString());
console.log(aviao4.toString());
console.log(aviao5.toString());
