export class Movimentacao {
    id: number | any;
    tipo: string;
    dataHora: Date;
    patrimonioId: number;
    salaId: number;

    constructor(
        tipo: string,
        patrimonioId: number,
        salaId: number,
        dataHora: Date = new Date(),
        id: any = null
    ) {
        this.id = id;
        this.tipo = tipo;
        this.dataHora = dataHora;
        this.patrimonioId = patrimonioId;
        this.salaId = salaId;
    }
}