import { NextResponse } from "next/server";
import { UsuarioRepository } from "@/src/repository/UsuarioRepository";
import { UsuarioService } from "@/src/services/UsuarioService";

const service = new UsuarioService(new UsuarioRepository());

export async function GET() {
    try {
        const todosUsuarios = await service.listar();
        return NextResponse.json(todosUsuarios, { status: 200 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        const res = await service.cadastrar(
            body.nome,
            body.email,
            body.senha,
        );

        return NextResponse.json(res, { status: 201 });
    } catch (e) {
        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}