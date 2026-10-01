import { NextResponse } from "next/server";
import { SalaRepository } from "@/src/repository/SalaRepository";
import { SalaService } from "@/src/services/SalaService";

const service = new SalaService(new SalaRepository());

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const sala = await service.buscarPorId(id);

        return NextResponse.json(sala, { status: 200 });
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
            body.leitorId
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