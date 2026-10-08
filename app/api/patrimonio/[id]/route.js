import { NextResponse } from "next/server";
import { PatrimonioRepository } from "@/src/repository/PatrimonioRepository";
import { PatrimonioService } from "@/src/services/PatrimonioService";

const service = new PatrimonioService(new PatrimonioRepository());

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const patrimonio = await service.buscarPorId(id);

        return NextResponse.json(patrimonio, { status: 200 });
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
            body.numeroPatrimonio,
            body.status,
            body.rfid,
            body.foto
        );

        return NextResponse.json(res, { status: 200 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(req.url);

        const forcar = searchParams.get("forcar") === "true";

        const res = await service.excluir(id, forcar);

        return NextResponse.json(res, { status: 200 });
    } catch (e) {
        if (e.possuiMovimentacoes) {
            return NextResponse.json({ erro: e.message, possuiMovimentacoes: true }, { status: 409 });
        }

        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}