import { NextResponse } from "next/server";
import { UsuarioRepository } from "@/src/repository/UsuarioRepository";
import { UsuarioService } from "@/src/services/UsuarioService";

const service = new UsuarioService(
    new UsuarioRepository()
);

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const usuario = await service.buscarPorId(id);

        return NextResponse.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo
        }, { status: 200 });

    } catch (e) {
        return NextResponse.json(
            { erro: e.message },
            { status: 404 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();

        const usuario = await service.atualizarPerfil(
            id,
            body.nome,
            body.novaSenha
        );

        return NextResponse.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo
        }, { status: 200 });

    } catch (e) {
        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}