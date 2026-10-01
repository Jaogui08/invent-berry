import { NextResponse } from "next/server";
import { PatrimonioRepository } from "@/src/repository/PatrimonioRepository";
import { PatrimonioService } from "@/src/services/PatrimonioService";

const service = new PatrimonioService(new PatrimonioRepository());

export async function GET() {
    try {
        const todosPatrimonios = await service.listar();
        return NextResponse.json(todosPatrimonios, { status: 200 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        const res = await service.cadastrar(
            body.nome,
            body.numeroPatrimonio,
            body.status,
            body.rfid,
            body.foto
        );

        return NextResponse.json(res, { status: 201 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}