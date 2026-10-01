import { Usuario } from "@/src/models/Usuario";

export class UsuarioService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(nome, email, senha) {
        if (!nome || nome.length < 2)
            throw new Error("O nome deve ter no mínimo 2 caracteres");

        if (!email)
            throw new Error("O email é obrigatório");

        if (!senha || senha.length < 6)
            throw new Error("A senha deve ter no mínimo 6 caracteres");

        const usuarioExistente =
            await this.repository.buscarPorEmail(email);

        if (usuarioExistente) {
            throw new Error(
                "Já existe um usuário cadastrado com este e-mail."
            );
        }

        let tipo = "usuario";

        const dominioEmail = email.split("@")[1];

        if (dominioEmail === "adminsesisp.com") {
            tipo = "adm";
        }

        const usuario = new Usuario(
            nome,
            email,
            senha,
            tipo,
        );

        return await this.repository.salvar(usuario);
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {
        const usuario = await this.repository.buscarPorId(id);

        if (!usuario)
            throw new Error("Usuário não encontrado");

        return usuario;
    }

    async atualizar(id, nome, email, senha, tipo) {
        if (!id)
            throw new Error("ID é obrigatório para atualização");

        if (!nome || !email || !senha || !tipo)
            throw new Error("Nome, email, senha e tipo são obrigatórios");

        const usuarioEmail =
            await this.repository.buscarPorEmail(email);

        if (
            usuarioEmail &&
            Number(usuarioEmail.id) !== Number(id)
        ) {
            throw new Error(
                "Já existe outro usuário cadastrado com este e-mail."
            );
        }

        await this.buscarPorId(id);

        const usuarioAtualizado = new Usuario(
            nome,
            email,
            senha,
            tipo,
            id
        );

        return await this.repository.atualizar(id, usuarioAtualizado);
    }

    async excluir(id) {
        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }

    async login(email, senha) {
        if (!email || !senha)
            throw new Error("E-mail e senha são obrigatórios");

        const usuario = await this.repository.buscarPorEmail(email);

        if (!usuario)
            throw new Error("E-mail ou senha incorretos");

        if (usuario.senha !== senha)
            throw new Error("E-mail ou senha incorretos");

        return usuario;
    }
}