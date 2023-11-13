import { validate } from "bycontract";
import nReadlines from "n-readlines";

import * as Pilotos from "./Piloto.js";

// A classe ServicoPilotos possui relação com a classe Piloto.
// Ao ser instanciada, ela carrega os dados dos pilotos existentes
// e instancia a classe Piloto para cada registro de piloto lido.
// Depois, guarda os pilotos existentes em um array.
// Possui um método para listar em tela os pilotos existentes,
// outro para listar apenas os que podem ser responsáveis pelos voos (habilitação ativa),
// e outro que recupera um piloto específico conforme os dados de matrícula informados.

export class ServicoPilotos{
    #pilotos;

    constructor(nomeArquivo) {
        validate(nomeArquivo, "string");
        this.#pilotos = [];
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
            let numeroMatricula = dados[0];
            let nome = dados[1];
            let habilitacaoAtiva = Boolean(dados[2]);
            let piloto = new Pilotos.Piloto(numeroMatricula,nome,habilitacaoAtiva);
            this.#pilotos.push(piloto);
        }
    }

    get pilotosCadastrados(){
        return this.#pilotos.values();
    }

    listaTodos(){
        console.log('Pilotos cadastrados: ');
        for(let pessoa of this.pilotosCadastrados){
            console.log(`  > ${pessoa.toString()}`);
        }
    }

    pilotosAtivos(){
        let resultado = [];
        for(let pessoa of this.pilotosCadastrados){
            if(pessoa.habilitacaoAtiva){
                resultado.push(pessoa.toString());
            }
        }
        if(resultado.length >= 1){
            console.log(`Pilotos disponíveis:`);
            return resultado;
        } else {
            return `Não foram encontrados pilotos com habilitação ativa`;
        }
    }

    recuperaInfo(matricula){
        validate(matricula,"string");
        let resultado = [];
        for(let pessoa of this.pilotosCadastrados){
            if(matricula == pessoa.numeroMatricula){
                resultado.push(pessoa.toString());
            }
        }
        if(resultado.length >= 1){
            console.log(`Pilotos com número de marícula ${matricula}:`);
            return resultado;
        } else {
            return `Número de matrícula não encontrado: ${matricula}`;
        }
    }
}

// let testePilotos = new ServicoPilotos("../dados/pilotos.csv");
// console.log(testePilotos.listaTodos());
// console.log(testePilotos.recuperaInfo("101111"));
// console.log(testePilotos.pilotosAtivos());