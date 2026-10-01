import { NextResponse } from "next/server";
import { SalaRepository } from "@/src/repository/SalaRepository";
import { SalaService } from "@/src/services/SalaService";

const service = new SalaService(new SalaRepository());

export async function GET() {
    try {
        const todasSalas = await service.listar();
        return NextResponse.json(todasSalas, { status: 200 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        const res = await service.cadastrar(
            body.nome,
            body.leitorId
        );

        return NextResponse.json(res, { status: 201 });
    } catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}