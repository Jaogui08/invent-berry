# InventBerry - Sistema de Inventário Inteligente

O **InventBerry** é um sistema web desenvolvido para facilitar e automatizar o controle de patrimônio em ambientes escolares. A solução reúne o cadastro de salas e patrimônios, o acompanhamento de movimentações e a identificação de itens por meio da tecnologia RFID.

O projeto foi desenvolvido a partir de uma necessidade observada no **SESI Itapetininga**, onde o inventário de milhares de itens exige conferência manual. A proposta é tornar esse processo mais rápido, organizado e rastreável.

## Objetivo

Centralizar as informações dos patrimônios da instituição e simplificar o acompanhamento de sua localização. Com a integração RFID, a leitura de uma tag pode identificar o patrimônio e registrar sua entrada ou saída de uma sala, mantendo o histórico de movimentações atualizado.

## Funcionalidades

- **Autenticação e usuários:** cadastro, login, perfil e níveis de acesso para usuários e administradores.
- **Salas:** cadastro, edição e exclusão de salas, com associação de identificadores dos leitores RFID.
- **Patrimônios:** cadastro, edição e exclusão de itens, com número de patrimônio, status e foto.
- **Movimentações:** registro manual ou por leitura RFID de entradas e saídas dos patrimônios.
- **Localização:** atualização da sala associada ao patrimônio conforme a movimentação registrada.
- **Histórico:** consulta das movimentações, com informações de data, horário, patrimônio e sala.
- **Dashboard:** visualização das informações e atualização automática dos dados exibidos.
- **Cadastro por RFID:** modo de captura de tags para associá-las aos patrimônios durante o cadastro.

## Como funciona a integração RFID

A comunicação entre o leitor e a aplicação utiliza a seguinte estrutura:

1. Uma tag RFID é aproximada do leitor conectado ao Raspberry Pi.
2. O Raspberry Pi publica o identificador da tag no broker MQTT.
3. Um listener em Python, localizado em `rfid_listener/listener.py`, recebe a mensagem.
4. O listener envia o número do patrimônio e o identificador do leitor para a rota `/api/rfid`.
5. A aplicação identifica o patrimônio e a sala associada ao leitor, registra a movimentação e atualiza a localização do item.
6. O dashboard apresenta as informações atualizadas.

O número gravado na tag deve corresponder ao campo **Número do patrimônio** cadastrado no InventBerry. Tags desconhecidas não geram movimentações.

## Tecnologias utilizadas

### Aplicação web
- **Next.js e React** — estrutura da aplicação, páginas, componentes e rotas da API.
- **TypeScript e JavaScript** — desenvolvimento da lógica da aplicação.
- **CSS** — estilização da interface.
- **Prisma ORM** — acesso e gerenciamento dos dados.
- **MySQL** — banco de dados.
- **Axios** — comunicação HTTP.
- **SweetAlert2** — alertas e confirmações.

### Integração e hardware
- **RFID** — identificação dos patrimônios por tags.
- **Raspberry Pi** — comunicação com o leitor RFID.
- **MQTT / Mosquitto** — transmissão das leituras.
- **Python** — listener responsável por receber as mensagens MQTT e encaminhá-las à API.

## Requisitos

Para executar a aplicação localmente, você precisará de:

- Node.js e npm;
- MySQL;
- Python 3 (necessário para executar o listener RFID);
- um broker MQTT, caso queira testar a integração RFID.

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Jaogui08/invent-berry.git
cd invent-berry
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco de dados MySQL e configure a variável `DATABASE_URL` em um arquivo `.env` na raiz do projeto.

Exemplo:

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/inventberry"
```

Substitua os valores de usuário, senha e nome do banco pelos dados do seu ambiente.

### 4. Prepare o Prisma

```bash
npx prisma generate
npx prisma db push
```

### 5. Inicie a aplicação

```bash
npm run dev
```

A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

### 6. (Opcional) Execute o listener RFID

Instale as dependências Python:

```bash
pip install paho-mqtt requests
```

Confira as configurações de broker, tópico MQTT e endereço da API no arquivo `rfid_listener/listener.py`. Com o broker, a aplicação e o Raspberry Pi configurados e em execução, inicie o listener:

```bash
python rfid_listener/listener.py
```

> **Observação:** a integração física depende da disponibilidade e da configuração do leitor RFID, do Raspberry Pi e do broker MQTT. Os endereços de conexão do listener devem ser ajustados conforme a rede utilizada.

## Equipe

Projeto desenvolvido por estudantes do curso de Desenvolvimento de Sistemas do SENAI:

- João Guilherme Fragoso de Sales
- João Thomaz Maia Rodrigues
- Laura Yukimi Horiy
- Maria Helena Tavares Vieira
