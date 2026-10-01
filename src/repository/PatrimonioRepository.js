import prisma from "@/src/lib/prisma";
import { Patrimonio } from "@/src/models/Patrimonio";

export class PatrimonioRepository {

    async salvar(obj) {
        return await prisma.patrimonio.create({
            data: {
                nome: obj.nome,
                numeroPatrimonio: obj.numeroPatrimonio,
                rfid: obj.rfid,
                salaId: obj.salaId,
                status: obj.status,
                foto: obj.foto
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.patrimonio.findMany();

        return dados.map(d =>
            new Patrimonio(
                d.nome,
                d.numeroPatrimonio,
                d.status,
                d.rfid,
                d.salaId,
                d.foto,
                d.id
            )
        );
    }

    async buscarPorId(id) {
        const dados = await prisma.patrimonio.findUnique({
            where: { id: Number(id) }
        });

        if (!dados) return null;

        return new Patrimonio(
            dados.nome,
            dados.numeroPatrimonio,
            dados.status,
            dados.rfid,
            dados.salaId,
            dados.foto,
            dados.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.patrimonio.update({
            where: { id: Number(id) },
            data: {
                nome: obj.nome,
                numeroPatrimonio: obj.numeroPatrimonio,
                rfid: obj.rfid,
                salaId: obj.salaId,
                status: obj.status,
                foto: obj.foto
            }
        });
    }

    async excluir(id) {
        return await prisma.patrimonio.delete({
            where: { id: Number(id) }
        });
    }

    async movimentacoes(id) {

        const quantidade = await prisma.movimentacao.count({
            where: {
                patrimonioId: Number(id)
            }
        });

        return quantidade > 0;
    }

    async atualizarSala(id, salaId) {

        return await prisma.patrimonio.update({
            where: {
                id: Number(id)
            },

            data: {
                salaId: salaId !== null
                    ? Number(salaId)
                    : null
            }
        });
    }

    async buscarPorNumeroPatrimonio(numeroPatrimonio) {

        const dados = await prisma.patrimonio.findUnique({
            where: {
                numeroPatrimonio: numeroPatrimonio
            }
        });

        if (!dados) return null;

        return new Patrimonio(
            dados.nome,
            dados.numeroPatrimonio,
            dados.status,
            dados.rfid,
            dados.salaId,
            dados.foto,
            dados.id
        );
    }


    async buscarPorRfid(rfid) {

        if (!rfid)
            return null;

        const dados = await prisma.patrimonio.findUnique({
            where: {
                rfid: rfid
            }
        });

        if (!dados) return null;

        return new Patrimonio(
            dados.nome,
            dados.numeroPatrimonio,
            dados.status,
            dados.rfid,
            dados.salaId,
            dados.foto,
            dados.id
        );
    }
}