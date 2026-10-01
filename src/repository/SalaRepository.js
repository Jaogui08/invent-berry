import prisma from "@/src/lib/prisma";
import { Sala } from "@/src/models/Sala";

export class SalaRepository {

    async salvar(obj) {
        return await prisma.sala.create({
            data: {
                nome: obj.nome,
                leitorId: obj.leitorId
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.sala.findMany();

        return dados.map(d =>
            new Sala(
                d.nome,
                d.leitorId,
                d.id
            )
        );
    }

    async buscarPorId(id) {
        const dados = await prisma.sala.findUnique({
            where: { id: Number(id) }
        });

        if (!dados) return null;

        return new Sala(
            dados.nome,
            dados.leitorId,
            dados.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.sala.update({
            where: { id: Number(id) },
            data: {
                nome: obj.nome,
                leitorId: obj.leitorId
            }
        });
    }

    async excluir(id) {
        return await prisma.sala.delete({
            where: { id: Number(id) }
        });
    }
}