import { Patrimonio } from "@/src/models/Patrimonio";

export class PatrimonioService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(nome, numeroPatrimonio, status, rfid, foto) {
        if (!nome || nome.length < 2)
            throw new Error("O nome deve ter no mínimo 2 caracteres");

        if (!numeroPatrimonio)
            throw new Error("O número do patrimônio é obrigatório");

        if (!status)
            throw new Error("O status do patrimônio é obrigatório");

        return await this.repository.salvar(
            new Patrimonio(
                nome,
                numeroPatrimonio,
                status,
                rfid,
                null,
                foto
            )
        );
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {
        const patrimonio = await this.repository.buscarPorId(id);

        if (!patrimonio)
            throw new Error("Patrimônio não encontrado");

        return patrimonio;
    }

    async atualizar(id, nome, numeroPatrimonio, status, rfid, foto) {
        if (!id)
            throw new Error("ID é obrigatório para atualização");

        if (!nome || !numeroPatrimonio || !status)
            throw new Error("Nome, número do patrimônio e status são obrigatórios");

        const patrimonioAtual = await this.buscarPorId(id);

        const patrimonioAtualizado = new Patrimonio(
            nome,
            numeroPatrimonio,
            status,
            rfid,
            patrimonioAtual.salaId,
            foto,
            id
        );

        return await this.repository.atualizar(id, patrimonioAtualizado);
    }

    async excluir(id) {

        const possuiMovimentacoes =
            await this.repository.movimentacoes(id);

        if (possuiMovimentacoes) {
            throw new Error(
                "Não é possível excluir este patrimônio, pois ele possui movimentações registradas."
            );
        }

        return await this.repository.excluir(id);
    }
}