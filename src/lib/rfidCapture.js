const globalRfid = globalThis;

if (!globalRfid.rfidCapture) {
    globalRfid.rfidCapture = {
        ativo: false,
        numeroPatrimonio: null
    };
}

export const rfidCapture =
    globalRfid.rfidCapture;