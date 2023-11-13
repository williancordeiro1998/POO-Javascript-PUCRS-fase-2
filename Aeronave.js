import { validate } from "bycontract";

// As aeronaves são identificadas por um prefixo (uma string).
// Serão considerados 3 tipos de aeronave:
// • Aeronave particular de pequeno porte;
// • Aeronave comercial de passageiros;
// • Aeronave comercial de carga.

// Sobre qualquer aeronave é necessário armazenar:
// o prefixo, o tipo de aeronave, a velocidade de cruzeiro (em quilômetros por hora)
// e a autonomia (em quilômetros).

class Aeronave{
    #prefixo;
    #tipo;
    #velocidadeCruzeiro;
    #autonomia;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia){
        validate(arguments,["string","string","number","number"]);
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

    get prefixo(){
        return this.#prefixo;
    }

    get tipo(){
        return this.#tipo;
    }

    get velocidadeCruzeiro(){
        return this.#velocidadeCruzeiro;
    }

    get autonomia(){
        return this.#autonomia;
    }

    toString(){
        let str = `Prefixo: ${this.prefixo}; Tipo: ${this.tipo}; `;
        str += `Velocidade de cruzeiro: ${this.velocidadeCruzeiro}km/h; `;
        str += `Autonomia: ${this.autonomia}km;`;
        return str;
    }

}

// Para as aeronaves de pequeno porte é necessário armazenar também:
// o nome da empresa responsável pela manutenção.

export class AeronavePequenoPorte extends Aeronave{
    #empresaManutencao;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia, empresaManutencao){
        validate(arguments,["string","string","number","number","string"]);
        super(prefixo, tipo, velocidadeCruzeiro, autonomia);
        this.#empresaManutencao = empresaManutencao;
    }

    get empresaManutencao(){
        return this.#empresaManutencao;
    }

    toString(){
        return (super.toString() +
            ` Responsável pela manutenção: ${this.#empresaManutencao};`);
    }
}

// Para qualquer tipo de aeronave comercial é necessário armazenar:
// o nome da companhia aérea.

class AeronaveComercial extends Aeronave{
    #nomeCiaAerea;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea){
        validate(arguments,["string","string","number","number","string"]);
        super(prefixo, tipo, velocidadeCruzeiro, autonomia);
        this.#nomeCiaAerea = nomeCiaAerea;
    }

    get nomeCiaAerea(){
        return this.#nomeCiaAerea;
    }

    toString(){
        return (super.toString() +
            ` Companhia Aérea: ${this.#nomeCiaAerea};`);
    }
}

// Para as aeronaves comerciais de passageiros é necessário armazenar:
// a quantidade de passageiros que pode transportar.

export class AeronaveComercialPassageiros extends AeronaveComercial {
    #maxPassageiros;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea, maxPassageiros){
        validate(arguments,["string","string","number","number","string","number"]);
        if (maxPassageiros <= 0) {
            throw new Error(`Quantidade inválida: ${maxPassageiros}`);
        }
        super(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea);
        this.#maxPassageiros = maxPassageiros;
    }

    get maxPassageiros(){
        return this.#maxPassageiros;
    }

    toString(){
        return (super.toString() +
            ` Quantidade máxima de passageiros: ${this.#maxPassageiros};`);
    }
}

// Para as aeronaves comerciais de carga é necessário armazenar:
// o peso máximo em toneladas que é capaz de levar.

export class AeronaveComercialCarga extends AeronaveComercial {
    #pesoMax;

    constructor(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea, pesoMax){
        validate(arguments,["string","string","number","number","string","number"]);
        if (pesoMax <= 0) {
            throw new Error(`Peso inválido: ${pesoMax}`);
        }
        super(prefixo, tipo, velocidadeCruzeiro, autonomia, nomeCiaAerea);
        this.#pesoMax = pesoMax;
    }

    get pesoMax(){
        return this.#pesoMax;
    }

    toString(){
        return (super.toString() +
            ` Carga máxima: ${this.#pesoMax}kg;`);
    }
}

// let aviao = new Aeronave("VVV", "carga", 500, 50);
// let aviao2 = new AeronavePequenoPorte("BBB", "particular", 888, 80, "conserta-avião" );
// let aviao3 = new AeronaveComercial("CCC", "passageiros", 500, 80, "supertam");
// let aviao4 = new AeronaveComercialPassageiros("AAA", "passageiros", 500, 50, "supertam", 100);
// let aviao5 = new AeronaveComercialCarga("DDD", "carga", 600, 100, "supercargo", 1000);
// console.log(aviao.toString());
// console.log(aviao2.toString());
// console.log(aviao3.toString());
// console.log(aviao4.toString());
// console.log(aviao5.toString());