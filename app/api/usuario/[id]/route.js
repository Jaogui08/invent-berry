import { NextResponse } from "next/server";
import { UsuarioRepository } from "@/src/repository/UsuarioRepository";
import { UsuarioService } from "@/src/services/UsuarioService";

const service = new UsuarioService(new UsuarioRepository());

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const usuario = await service.buscarPorId(id);

        return NextResponse.json(usuario, { status: 200 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 404 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();

        const res = await service.atualizar(
            id,
            body.nome,
            body.email,
            body.senha,
            body.tipo
        );

        return NextResponse.json(res, { status: 200 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        const res = await service.excluir(id);

        return NextResponse.json(res, { status: 200 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}