'use client';

import './css/styleLogin.css';
import { useLogin } from '@/app/hooks/useLogin';

export default function Login() {
    const {
        email,
        setEmail,
        senha,
        setSenha,
        entrando,
        entrar
    } = useLogin();

    return (
        <div className="login-page">
            <div className="login-box">
                <h1>Faça Login</h1>
                <form onSubmit={entrar}>
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
                        <h1>Não possui uma conta ainda? <a href="/cadastro">cadastre-se aqui!</a></h1>
                    </div>

                    <button type="submit" disabled={entrando}>
                        {entrando ? "Entrando.." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}