import { NextResponse } from "next/server";
import { UsuarioRepository } from "@/src/repository/UsuarioRepository";
import { UsuarioService } from "@/src/services/UsuarioService";

const service = new UsuarioService(new UsuarioRepository());

export async function POST(req) {
    try {
        const body = await req.json();

        const usuario = await service.login(
            body.email,
            body.senha
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
            { status: 401 }
        );
    }
}