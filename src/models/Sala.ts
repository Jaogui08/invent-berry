export class Sala {
    id: number | any;
    nome: string;
    leitorId: string | null;

    constructor(nome: string, leitorId: string | null = null, id: any = null) {
        this.id = id;
        this.nome = nome;
        this.leitorId = leitorId;
    }
}