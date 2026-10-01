import prisma from "@/src/lib/prisma";
import { Movimentacao } from "@/src/models/Movimentacao";

export class MovimentacaoRepository {

    async salvar(obj) {
        return await prisma.movimentacao.create({
            data: {
                tipo: obj.tipo,
                dataHora: obj.dataHora,
                patrimonioId: obj.patrimonioId,
                salaId: obj.salaId
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.movimentacao.findMany({
            include: {
                patrimonio: true,
                sala: true
            },

            orderBy: {
                dataHora: "desc"
            }
        });

        return dados;
    }

    async buscarPorId(id) {
        const dados = await prisma.movimentacao.findUnique({
            where: { id: Number(id) }
        });

        if (!dados) return null;

        return new Movimentacao(
            dados.tipo,
            dados.patrimonioId,
            dados.salaId,
            dados.dataHora,
            dados.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.movimentacao.update({
            where: { id: Number(id) },
            data: {
                tipo: obj.tipo,
                dataHora: obj.dataHora,
                patrimonioId: obj.patrimonioId,
                salaId: obj.salaId
            }
        });
    }

    async excluir(id) {
        return await prisma.movimentacao.delete({
            where: { id: Number(id) }
        });
    }
}