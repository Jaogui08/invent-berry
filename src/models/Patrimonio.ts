export class Patrimonio {
    id: number | any;
    nome: string;
    numeroPatrimonio: string;
    salaId: number | null;
    status: string;
    foto: string | null;

    constructor(
        nome: string,
        numeroPatrimonio: string,
        status: string,
        salaId: number | null = null,
        foto: string | null = null,
        id: any = null
    ) {
        this.id = id;
        this.nome = nome;
        this.numeroPatrimonio = numeroPatrimonio;
        this.status = status;
        this.salaId = salaId;
        this.foto = foto;
    }
}