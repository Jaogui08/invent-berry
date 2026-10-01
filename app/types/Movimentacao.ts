export interface Movimentacao {
    id?: number;
    tipo: string;
    dataHora: string;
    patrimonioId: number;
    salaId: number;

    patrimonio?: {
        nome: string;
        status: string;
        foto?: string | null;
    };

    sala?: {
        nome: string;
    };
}