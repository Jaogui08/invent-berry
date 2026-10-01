import { NextResponse } from "next/server";
import { MovimentacaoRepository } from "@/src/repository/MovimentacaoRepository";
import { MovimentacaoService } from "@/src/services/MovimentacaoService";

const service = new MovimentacaoService(new MovimentacaoRepository());

export async function GET() {
    try {
        const todasMovimentacoes = await service.listar();
        return NextResponse.json(todasMovimentacoes, { status: 200 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        const res = await service.cadastrar(
            body.tipo,
            body.patrimonioId,
            body.salaId
        );

        return NextResponse.json(res, { status: 201 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}