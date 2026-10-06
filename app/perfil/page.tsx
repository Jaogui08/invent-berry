'use client';

import { usePerfil } from '@/app/hooks/usePerfil';
import NavBar from '../components/NavBar';
import NavBarAdmin from '../components/NavBarAdmin';
import '../css/stylePerfil.css';

export default function Perfil() {

    const {
        nome,
        setNome,
        email,
        novaSenha,
        setNovaSenha,
        confirmarSenha,
        setConfirmarSenha,
        tipo,
        carregando,
        salvando,
        possuiAlteracoes,
        senhasIguais,
        salvar
    } = usePerfil();

    if (carregando) {
        return (
            <div className="perfil-page">
                <p className="perfil-carregando">
                    Carregando perfil...
                </p>
            </div>
        );
    }

    return (
        <div className="perfil-page">

            {tipo === "adm"
                ? <NavBarAdmin />
                : <NavBar />
            }

            <div className="perfil-area">
                <div className="perfil-container">
                    <h1>Meu Perfil</h1>
                    <form onSubmit={salvar}>
                        <div className="perfil-campo">
                            <label htmlFor="nome">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) =>
                                    setNome(e.target.value)
                                }
                            />
                        </div>

                        <div className="perfil-campo">
                            <label htmlFor="email">
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                disabled
                            />
                        </div>

                        <div className="perfil-campo">
                            <label htmlFor="senha">
                                Nova senha
                            </label>
                            <input
                                type="password"
                                id="senha"
                                placeholder="Mantenha este campo vazio para manter a senha atual"
                                value={novaSenha}
                                onChange={(e) =>
                                    setNovaSenha(e.target.value)
                                }
                            />
                        </div>

                        <div className="perfil-campo">
                            <label htmlFor="confirmarSenha">
                                Confirme a nova senha
                            </label>
                            <input
                                type="password"
                                id="confirmarSenha"
                                placeholder="Digite novamente a nova senha"
                                value={confirmarSenha}
                                onChange={(e) =>
                                    setConfirmarSenha(e.target.value)
                                }
                            />

                            {confirmarSenha.length > 0 && !senhasIguais && (
                                <span className="senha-erro">
                                    As senhas não coincidem.
                                </span>
                            )}

                        </div>

                        <button
                            type="submit"
                            disabled={salvando || !possuiAlteracoes || !senhasIguais}
                        >
                            {salvando
                                ? 'Salvando...'
                                : 'Salvar alterações'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}