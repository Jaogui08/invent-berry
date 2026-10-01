export class Usuario {
    id: number | any;
    nome: string;
    email: string;
    senha: string;
    tipo: string;

    constructor(nome: string, email: string, senha: string, tipo: string, id: any = null) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
    }
}