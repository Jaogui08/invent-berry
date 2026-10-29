import { NextResponse } from "next/server";
import { rfidCapture } from "@/src/lib/rfidCapture";

export async function GET() {

    return NextResponse.json({
        ativo: rfidCapture.ativo,
        numeroPatrimonio: rfidCapture.numeroPatrimonio
    });
}

export async function POST(req) {

    try {

        const body = await req.json();

        if (body.acao === "iniciar") {

            rfidCapture.ativo = true;

            rfidCapture.numeroPatrimonio = null;

            return NextResponse.json({
                mensagem: "Aguardando leitura RFID."
            });
        }

        if (body.acao === "capturar") {

            if (!rfidCapture.ativo) {

                return NextResponse.json(
                    { erro: "Nenhuma captura está ativa." }, { status: 409 }
                );
            }

            if (!body.numeroPatrimonio) {

                return NextResponse.json(
                    { erro: "Número do patrimônio não informado." }, { status: 400 }
                );
            }

            rfidCapture.numeroPatrimonio = String(body.numeroPatrimonio);

            rfidCapture.ativo = false;

            return NextResponse.json({
                mensagem: "Tag capturada com sucesso.",

                numeroPatrimonio: rfidCapture.numeroPatrimonio
            });
        }

        return NextResponse.json(
            { erro: "Ação inválida." }, { status: 400 }
        );


    } catch (e) {

        return NextResponse.json(
            { erro: e.message }, { status: 400 }
        );
    }
}

export async function DELETE() {

    rfidCapture.ativo = false;

    rfidCapture.numeroPatrimonio = null;

    return NextResponse.json({
        mensagem: "Captura cancelada."
    });
}