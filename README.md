<h1>InventBerry - Sistema de Inventário Inteligente</h1>

<h2>Status do projeto</h2>

🚧 **Projeto em desenvolvimento**

A versão atual do InventBerry representa o MVP funcional da aplicação.  
As principais funcionalidades do sistema web já estão implementadas, enquanto a integração completa com RFID, Raspberry Pi e comunicação MQTT ainda está em desenvolvimento.

---

<h2>Descrição do projeto</h2>

O InventBerry é um sistema desenvolvido com o objetivo de automatizar e facilitar o controle de patrimônio e inventário dentro de ambientes escolares.

O projeto surgiu a partir da necessidade de melhorar o processo de inventário realizado no SESI Itapetininga, que atualmente envolve a conferência manual de milhares de itens.

A aplicação permite o cadastro e gerenciamento de patrimônios e salas, além do registro e acompanhamento das movimentações dos equipamentos.

Na versão final do projeto, cada patrimônio será identificado através de uma tag RFID. Leitores instalados nas salas, conectados a um Raspberry Pi, serão responsáveis por identificar automaticamente a movimentação dos itens e enviar essas informações ao sistema.

---

<h2>Funcionalidades atuais</h2>

* Cadastro e login de usuários.
* Diferenciação entre usuários comuns e administradores.
* Controle de sessão e expiração automática do login.
* Página de perfil com alteração de nome e senha.
* Cadastro e gerenciamento de salas.
* Cadastro, edição e exclusão de patrimônios.
* Associação de códigos RFID aos patrimônios.
* Associação de identificadores de leitores RFID às salas.
* Controle de status dos patrimônios.
* Registro manual de entrada e saída dos patrimônios.
* Atualização automática da localização atual do patrimônio.
* Histórico de movimentações.
* Paginação das tabelas.
* Confirmações e alertas utilizando SweetAlert2.

---

<h2>Funcionalidades em desenvolvimento</h2>

* Integração do leitor RFID com o Raspberry Pi.
* Identificação automática dos patrimônios através das tags RFID.
* Comunicação entre Raspberry Pi e sistema através de MQTT/Mosquitto.
* Registro automático de movimentações.
* Identificação automática da sala através do leitor RFID.
* Integração completa entre hardware, API e banco de dados.

---

<h2>Tecnologias utilizadas</h2>

* **Next.js e React:** Desenvolvimento da aplicação web, páginas, componentes e rotas da API.
* **TypeScript e JavaScript:** Desenvolvimento da lógica do frontend e backend.
* **CSS:** Estilização das páginas e componentes.
* **Prisma ORM:** Comunicação e gerenciamento dos dados da aplicação.
* **MySQL:** Banco de dados utilizado para armazenar usuários, salas, patrimônios e movimentações.
* **Axios:** Comunicação entre o frontend e as rotas da API.
* **SweetAlert2:** Criação de notificações, confirmações e caixas de diálogo.
* **LocalStorage:** Armazenamento dos dados da sessão do usuário no navegador.
* **RFID:** Tecnologia utilizada para identificação dos patrimônios.
* **Raspberry Pi:** Responsável pela comunicação entre os leitores RFID e o sistema.
* **MQTT / Mosquitto:** Comunicação dos dados entre o Raspberry Pi e a aplicação.
* **VS Code:** Ambiente de desenvolvimento utilizado na implementação do projeto.

---

<h2>Equipe</h2>

- João Guilherme Fragoso de Sales
- João Thomaz Maia Rodrigues
- Laura Yukimi Horiy
- Maria Helena Tavares Vieira