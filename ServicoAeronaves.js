import { validate } from "bycontract";
import nReadlines from "n-readlines";

import * as Aeronaves from "./Aeronave.js";

// A classe ServicoAeronaves possui relação com extensões da classe Aeronave.
// Ao ser instanciada, ela carrega os dados das aeronaves existentes
// e instancia cada classe de aeronave conforme o tipo correspondente.
// Depois, guarda as aeronaves disponíveis em um array.
// Por fim, possui um método para listar em tela as aeronaves disponíveis.

export class ServicoAeronaves{
    #aeronaves;

    constructor(nomeArquivo) {
        validate(nomeArquivo, "string");
        this.#aeronaves = [];
        this.carregaDados(nomeArquivo);
    }

    carregaDados(nomeArquivo) {
        validate(nomeArquivo, "string");
        let arq = new nReadlines(nomeArquivo);
        let buf = "";
        let line = "";
        let dados = "";

        // Pula a primeira linha
        arq.next();
        // Enquanto houverem linhas (leitura síncrona)
        while (buf = arq.next()) {
            line = buf.toString('utf8');
            dados = line.split(",");
            let prefixo = dados[0];
            let tipo = dados[1];
            let velocidadeCruzeiro = Number(parseInt(dados[2]));
            let autonomia = Number(parseInt(dados[3]));
            let empresaManutencao = dados[4];
            let nomeCiaAerea = dados[5];
            let maxPassageiros = Number(parseInt(dados[6]));
            let pesoMax = Number(parseInt(dados[7]));
            switch (tipo) {
                case 'PEQ':
                    let aviaoPeqPorte = new Aeronaves.AeronavePequenoPorte(prefixo,tipo,velocidadeCruzeiro,autonomia,empresaManutencao);
                    this.#aeronaves.push(aviaoPeqPorte);
                    break;
                case 'PAS':
                    let aviaoPassageiros = new Aeronaves.AeronaveComercialPassageiros(prefixo,tipo,velocidadeCruzeiro,autonomia,nomeCiaAerea,maxPassageiros);
                    this.#aeronaves.push(aviaoPassageiros);
                    break;
                case 'CAR':
                    let aviaoCarga = new Aeronaves.AeronaveComercialCarga(prefixo,tipo,velocidadeCruzeiro,autonomia,nomeCiaAerea,pesoMax);
                    this.#aeronaves.push(aviaoCarga);
                    break;
                default:
                    throw new Error('Elemento invalido');
            }
        }
    }

    get aeronavesDisponiveis(){
        return this.#aeronaves.values();
    }

    listaTodas(){
        console.log('Aeronaves disponiveis: ');
        for(let aviao of this.aeronavesDisponiveis){
            console.log(`  > ${aviao.toString()}`);
        }
    }
}

// let testeAeronaves = new ServicoAeronaves("../dados/aeronaves.csv");
// console.log(testeAeronaves.listaTodas());