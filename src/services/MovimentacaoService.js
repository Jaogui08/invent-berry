import { Movimentacao } from "@/src/models/Movimentacao";

export class MovimentacaoService {
    constructor(repository, patrimonioRepository, salaRepository) {
        this.repository = repository;
        this.patrimonioRepository = patrimonioRepository;
        this.salaRepository = salaRepository;
    }

    async cadastrar(tipo, patrimonioId, salaId) {

        if (!tipo)
            throw new Error("O tipo da movimentação é obrigatório");

        if (!patrimonioId)
            throw new Error("O patrimônio é obrigatório");

        if (!salaId)
            throw new Error("A sala é obrigatória");


        if (tipo !== "ENTRADA" && tipo !== "SAÍDA")
            throw new Error("Tipo de movimentação inválido");

        const patrimonio =
            await this.patrimonioRepository.buscarPorId(patrimonioId);

        if (!patrimonio)
            throw new Error("Patrimônio não encontrado");

        const sala =
            await this.salaRepository.buscarPorId(salaId);

        if (!sala)
            throw new Error("Sala não encontrada");

        if (tipo === "ENTRADA") {

            if (patrimonio.salaId !== null) {
                throw new Error(
                    "Este patrimônio já está localizado em uma sala."
                );
            }

            const movimentacao =
                await this.repository.salvar(
                    new Movimentacao(
                        tipo,
                        Number(patrimonioId),
                        Number(salaId)
                    )
                );

            await this.patrimonioRepository.atualizarSala(
                patrimonioId,
                salaId
            );

            return movimentacao;
        }

        if (tipo === "SAÍDA") {

            if (patrimonio.salaId === null) {
                throw new Error(
                    "Este patrimônio não está localizado em nenhuma sala."
                );
            }

            if (
                Number(patrimonio.salaId) !==
                Number(salaId)
            ) {
                throw new Error(
                    "Este patrimônio não está localizado na sala selecionada."
                );
            }

            const movimentacao =
                await this.repository.salvar(
                    new Movimentacao(
                        tipo,
                        Number(patrimonioId),
                        Number(salaId)
                    )
                );

            await this.patrimonioRepository.atualizarSala(
                patrimonioId,
                null
            );

            return movimentacao;
        }
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {

        const movimentacao =
            await this.repository.buscarPorId(id);

        if (!movimentacao)
            throw new Error("Movimentação não encontrada");

        return movimentacao;
    }

    async atualizar(id, tipo, patrimonioId, salaId) {

        if (!id)
            throw new Error("ID é obrigatório");

        if (!tipo || !patrimonioId || !salaId)
            throw new Error(
                "Tipo, patrimônio e sala são obrigatórios"
            );

        await this.buscarPorId(id);

        const movimentacao =
            new Movimentacao(
                tipo,
                Number(patrimonioId),
                Number(salaId),
                new Date(),
                Number(id)
            );

        return await this.repository.atualizar(
            id,
            movimentacao
        );
    }

    async excluir(id) {
        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}