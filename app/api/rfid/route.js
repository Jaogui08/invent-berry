import { NextResponse } from "next/server";

import { MovimentacaoRepository }
    from "@/src/repository/MovimentacaoRepository";

import { PatrimonioRepository }
    from "@/src/repository/PatrimonioRepository";

import { SalaRepository }
    from "@/src/repository/SalaRepository";

import { MovimentacaoService }
    from "@/src/services/MovimentacaoService";


const service = new MovimentacaoService(
    new MovimentacaoRepository(),
    new PatrimonioRepository(),
    new SalaRepository()
);


export async function POST(req) {

    try {

        const body = await req.json();

        const movimentacao =
            await service.registrarLeitura(
                body.numeroPatrimonio,
                body.leitorId
            );

        return NextResponse.json(
            movimentacao,
            { status: 201 }
        );

    } catch (e) {

        return NextResponse.json(
            {
                erro: e.message
            },
            {
                status: 400
            }
        );
    }
}