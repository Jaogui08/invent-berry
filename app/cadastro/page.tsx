'use client';

import '../css/styleLogin.css';
import { useUsuarioForm } from '@/app/hooks/useUsuariosForm';

export default function Cadastro() {
    const {
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        salvando,
        salvar
    } = useUsuarioForm();

    return (
        <div className="login-page">
            <div className="login-box">
                <h1>Cadastre-se Aqui</h1>
                <form onSubmit={salvar}>
                    <div className="campo">
                        <label htmlFor="nome">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Insira seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            autoCapitalize='off'
                            autoComplete='off'
                            autoCorrect='off'
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="email">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Insira seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoCapitalize='off'
                            autoComplete='off'
                            autoCorrect='off'
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="senha">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="Insira sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoCapitalize='off'
                            autoComplete='off'
                            autoCorrect='off'
                        />
                    </div>

                    <div className="link">
                        <h1>Já possui uma conta? <a href="/">faça login aqui!</a></h1>
                    </div>

                    <button type="submit" disabled={salvando}>
                        {salvando ? "Cadastrando.." : "Cadastrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}