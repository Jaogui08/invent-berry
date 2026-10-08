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

        const patrimonioNumero =
            await this.repository.buscarPorNumeroPatrimonio(
                numeroPatrimonio
            );

        if (patrimonioNumero) {
            throw new Error(
                "Já existe um patrimônio com este número."
            );
        }

        if (rfid) {

            const patrimonioRfid =
                await this.repository.buscarPorRfid(rfid);

            if (patrimonioRfid) {
                throw new Error(
                    "Este RFID já está cadastrado em outro patrimônio."
                );
            }
        }

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

        const patrimonioNumero =
            await this.repository.buscarPorNumeroPatrimonio(
                numeroPatrimonio
            );

        if (
            patrimonioNumero &&
            Number(patrimonioNumero.id) !== Number(id)
        ) {
            throw new Error(
                "Já existe outro patrimônio com este número."
            );
        }

        if (rfid) {

            const patrimonioRfid =
                await this.repository.buscarPorRfid(rfid);

            if (
                patrimonioRfid &&
                Number(patrimonioRfid.id) !== Number(id)
            ) {
                throw new Error(
                    "Este RFID já está cadastrado em outro patrimônio."
                );
            }

        }

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

    async excluir(id, forcar = false) {
        await this.buscarPorId(id);

        const possuiMovimentacoes =
            await this.repository.movimentacoes(id);

        if (possuiMovimentacoes && !forcar) {
            const erro = new Error(
                "Este patrimõnio possui movimentações registradas."
            );

            erro.possuiMovimentacoes = true;

            throw erro;
        }

        if (possuiMovimentacoes && forcar) {
            return await this.repository.excluirComMovimentacoes(id);
        }

        return await this.repository.excluir(id);
    }
}