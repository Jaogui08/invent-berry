import { NextResponse } from "next/server";
import { MovimentacaoRepository } from "@/src/repository/MovimentacaoRepository";
import { MovimentacaoService } from "@/src/services/MovimentacaoService";

const service = new MovimentacaoService(new MovimentacaoRepository());

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const movimentacao = await service.buscarPorId(id);

        return NextResponse.json(movimentacao, { status: 200 });
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
            body.tipo,
            body.patrimonioId,
            body.salaId,
            body.dataHora
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