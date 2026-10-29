import paho.mqtt.client as mqtt
import requests

MQTT_BROKER = "10.121.138.156"
MQTT_PORT = 1883
MQTT_TOPIC = "RaspRFID/data"

API_URL = "http://localhost:3000/api/rfid"

CAPTURE_URL = (
    "http://localhost:3000"
    "/api/rfid/captura"
)

LEITOR_ID = "LEITOR_01"

def on_connect(
    client,
    userdata,
    flags,
    reason_code,
    properties
):

    if reason_code == 0:

        print("✅ Conectado ao MQTT Broker!")

        client.subscribe(MQTT_TOPIC)

        print(f"📡 Escutando: {MQTT_TOPIC}")
        print("Aguardando leitura RFID...\n")

    else:

        print(
            f"❌ Erro ao conectar ao MQTT. "
            f"Código: {reason_code}"
        )

def on_message(client, userdata, msg):

    try:

        numero_patrimonio = (
            msg.payload
            .decode("utf-8")
            .strip()
        )

        print("================================")

        print(
            f"🏷️ Tag recebida: "
            f"{numero_patrimonio}"
        )

        captura_status = requests.get(
            CAPTURE_URL,
            timeout=2
        )

        if captura_status.ok:

            captura_dados = (
                captura_status.json()
            )

            if captura_dados.get("ativo"):

                resposta_captura = requests.post(
                    CAPTURE_URL,

                    json={
                        "acao": "capturar",

                        "numeroPatrimonio":
                            numero_patrimonio
                    },

                    timeout=5
                )

                if resposta_captura.ok:

                    print(
                        "📋 Tag enviada para "
                        "o cadastro de patrimônio."
                    )

                    print(
                        "Nenhuma movimentação "
                        "foi registrada."
                    )

                    print(
                        "================================\n"
                    )

                    return

        dados = {

            "numeroPatrimonio":
                numero_patrimonio,

            "leitorId":
                LEITOR_ID
        }

        resposta = requests.post(
            API_URL,
            json=dados,
            timeout=5
        )

        if resposta.ok:

            movimentacao = resposta.json()

            print(
                f"✅ {movimentacao['tipo']} "
                f"registrada!"
            )

            print(
                f"Patrimônio ID: "
                f"{movimentacao['patrimonioId']}"
            )

            print(
                f"Sala ID: "
                f"{movimentacao['salaId']}"
            )

        elif resposta.status_code == 404:

            erro = resposta.json()

            if (
                erro.get("erro")
                == "TAG_DESCONHECIDA"
            ):

                print(
                    f"⚠️ Tag não cadastrada: "
                    f"{numero_patrimonio}"
                )

                print(
                    "Nenhuma movimentação "
                    "foi registrada."
                )

            else:

                print(
                    f"❌ InventBerry: "
                    f"{erro.get('mensagem')}"
                )

        else:

            erro = resposta.json()

            print(
                f"❌ InventBerry: "
                f"{erro.get('erro')}"
            )

        print(
            "================================\n"
        )

    except requests.RequestException as erro:

        print(
            f"❌ Erro ao conectar com o "
            f"InventBerry: {erro}"
        )

    except Exception as erro:

        print(
            f"❌ Erro ao processar leitura: "
            f"{erro}"
        )

client = mqtt.Client(
    mqtt.CallbackAPIVersion.VERSION2
)

client.on_connect = on_connect
client.on_message = on_message

print(
    "🔌 Tentando conectar ao MQTT Broker..."
)

try:

    client.connect(
        MQTT_BROKER,
        MQTT_PORT,
        60
    )

    client.loop_forever()

except KeyboardInterrupt:

    print(
        "\n🛑 Listener encerrado."
    )

except Exception as erro:

    print(
        f"❌ Erro ao conectar ao MQTT: "
        f"{erro}"
    )