import { validate } from "bycontract";
import nReadlines from "n-readlines";

import * as Aerovias from "./Aerovia.js";

// A classe ServicoAerovias possui relação com a classe Aerovia.
// Ao ser instanciada, ela carrega os dados das aerovias existentes
// e instancia a classe Aerovia para cada dado de aerovia lido.
// Depois, guarda as aerovias disponíveis em um array.
// Possui um método para listar em tela as aerovias existentes.
// E outro método que recupera uma aerovia específica conforme os dados de
// aeroporto de origem e de destino informados.

export class ServicoAerovias{
    #aerovias;

    constructor(nomeArquivo) {
        validate(nomeArquivo, "string");
        this.#aerovias = [];
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
            let identificador = dados[0];
            let aeroportoOrigem = dados[1];
            let aeroportoDestino = dados[2];
            let tamanho = Number(parseInt(dados[3]));
            let aerovia = new Aerovias.Aerovia(identificador,aeroportoOrigem,aeroportoDestino,tamanho);
            this.#aerovias.push(aerovia);
        }
    }

    get aeroviasDisponiveis(){
        return this.#aerovias.values();
    }

    listaTodas(){
        console.log('Aerovias disponiveis: ');
        for(let via of this.aeroviasDisponiveis){
            console.log(`  > ${via.toString()}`);
        }
    }

    recuperaInfo(origem, destino){
        validate(arguments,["string","string"]);
        let resultado = [];
        for(let via of this.aeroviasDisponiveis){
            if(origem == via.aeroportoOrigem && destino == via.aeroportoDestino){
                resultado.push(via.toString());
            }
        }
        if(resultado.length >= 1){
            console.log(`Aerovias com Origem em ${origem} e Destino em ${destino}:`);
            return resultado;
        } else {
            return `Siglas de aeroportos inválidas: ${origem}, ${destino}`;
        }
    }
}

// let testeAerovias = new ServicoAerovias("../dados/aerovias.csv");
// console.log(testeAerovias.listaTodas());
// console.log(testeAerovias.recuperaInfo("FLO","GRU"));