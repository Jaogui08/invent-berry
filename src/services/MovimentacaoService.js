import { Movimentacao } from "@/src/models/Movimentacao";

export class MovimentacaoService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(tipo, patrimonioId, salaId) {
        if (!tipo)
            throw new Error("O tipo da movimentação é obrigatório");

        if (!patrimonioId)
            throw new Error("O patrimônio é obrigatório");

        if (!salaId)
            throw new Error("A sala é obrigatória");

        return await this.repository.salvar(
            new Movimentacao(
                tipo,
                patrimonioId,
                salaId
            )
        );
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {
        const movimentacao = await this.repository.buscarPorId(id);

        if (!movimentacao)
            throw new Error("Movimentação não encontrada");

        return movimentacao;
    }

    async atualizar(id, tipo, patrimonioId, salaId, dataHora) {
        if (!id)
            throw new Error("ID é obrigatório para atualização");

        if (!tipo || !patrimonioId || !salaId)
            throw new Error("Tipo, patrimônio e sala são obrigatórios");

        await this.buscarPorId(id);

        const movimentacaoAtualizada = new Movimentacao(
            tipo,
            patrimonioId,
            salaId,
            dataHora,
            id
        );

        return await this.repository.atualizar(
            id,
            movimentacaoAtualizada
        );
    }

    async excluir(id) {
        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}