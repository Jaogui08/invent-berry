export class Patrimonio {
    id: number | any;
    nome: string;
    numeroPatrimonio: string;
    rfid: string | null;
    salaId: number | null;
    status: string;
    foto: string | null;

    constructor(
        nome: string,
        numeroPatrimonio: string,
        status: string,
        rfid: string | null = null,
        salaId: number | null = null,
        foto: string | null = null,
        id: any = null
    ) {
        this.id = id;
        this.nome = nome;
        this.numeroPatrimonio = numeroPatrimonio;
        this.status = status;
        this.rfid = rfid;
        this.salaId = salaId;
        this.foto = foto;
    }
}