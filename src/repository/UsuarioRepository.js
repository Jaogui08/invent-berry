import prisma from "@/src/lib/prisma";
import { Usuario } from "@/src/models/Usuario";

export class UsuarioRepository {

    async salvar(obj) {
        return await prisma.usuario.create({
            data: {
                nome: obj.nome,
                email: obj.email,
                senha: obj.senha,
                tipo: obj.tipo
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.usuario.findMany();
        
        return dados.map(d =>
            new Usuario(
                d.nome,
                d.email,
                d.senha,
                d.tipo,
                d.id
            )
        );
    }

    async buscarPorId(id) {
        const dados = await prisma.usuario.findUnique({
            where: { id: Number(id) }
        });

        if (!dados) return null;

        return new Usuario(
            dados.nome,
            dados.email,
            dados.senha,
            dados.tipo,
            dados.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.usuario.update({
            where: { id: Number(id) },
            data: {
                nome: obj.nome,
                email: obj.email,
                senha: obj.senha,
                tipo: obj.tipo
            }
        });
    }

    async excluir(id) {
        return await prisma.usuario.delete({
            where: { id: Number(id) }
        });
    }

    async buscarPorEmail(email) {
        const dados = await prisma.usuario.findUnique({
            where: { email: email }
        });

        if (!dados) return null;

        return new Usuario(
            dados.nome,
            dados.email,
            dados.senha,
            dados.tipo,
            dados.id
        );
    }
}