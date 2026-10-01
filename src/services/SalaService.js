import { Sala } from "@/src/models/Sala";

export class SalaService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(nome, leitorId) {
        if (!nome || nome.length < 2)
            throw new Error("O nome deve ter no mínimo 2 caracteres");

        if (leitorId) {

            const leitorExistente =
                await this.repository.buscarPorLeitorId(
                    leitorId
                );

            if (leitorExistente) {
                throw new Error(
                    "Este leitor já está associado a outra sala."
                );
            }
        }

        return await this.repository.salvar(
            new Sala(nome, leitorId)
        );
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {
        const sala = await this.repository.buscarPorId(id);

        if (!sala)
            throw new Error("Sala não encontrada");

        return sala;
    }

    async atualizar(id, nome, leitorId) {
        if (!id)
            throw new Error("ID é obrigatório para atualização");

        if (!nome)
            throw new Error("O nome da sala é obrigatório");

        const leitorExistente =
            await this.repository.buscarPorLeitorId(
                leitorId
            );

        if (
            leitorExistente &&
            Number(leitorExistente.id) !== Number(id)
        ) {
            throw new Error(
                "Este leitor já está associado a outra sala."
            );
        }

        await this.buscarPorId(id);

        const salaAtualizada = new Sala(nome, leitorId, id);

        return await this.repository.atualizar(id, salaAtualizada);
    }

    async excluir(id) {
        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}