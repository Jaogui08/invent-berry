'use client';

import { usePerfil } from '@/app/hooks/usePerfil';
import { useProtecaoRota } from '../hooks/useProtecaoRota';
import NavBar from '../components/NavBar';
import NavBarAdmin from '../components/NavBarAdmin';
import Swal from 'sweetalert2';
import '../css/stylePerfil.css';

export default function Perfil() {

    const {carregando: verificandoSessao} = useProtecaoRota('qualquer');

    const {
        nome,
        setNome,
        email,
        foto,
        setFoto,
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

    const processarFoto = (arquivo: File) => {

        const tiposPermitidos = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ];

        if (!tiposPermitidos.includes(arquivo.type)) {

            Swal.fire({
                title: 'Arquivo inválido!',
                text: 'Selecione uma imagem JPG, PNG ou WEBP.',
                icon: 'warning',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background:'#211d1d'
            });

            return;
        }

        const tamanhoMaximo = 10 * 1024 * 1024;

        if (arquivo.size > tamanhoMaximo) {

            Swal.fire({
                title: 'Imagem muito grande!',
                text: 'A imagem deve ter no máximo 10 MB.',
                icon: 'warning',
                confirmButtonColor:'#ca0101',
                color: '#e6e6e6',
                background: '#211d1d'
            });

            return;
        }

        const leitor = new FileReader();

        leitor.onload = () => {

            if (typeof leitor.result === 'string') {
                setFoto(leitor.result);
            }
        };

        leitor.readAsDataURL(arquivo);
    };

    const selecionarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {

        const arquivo = e.target.files?.[0];

        if (arquivo) {

            processarFoto(arquivo);
        }
    };

    const soltarFoto = (e: React.DragEvent<HTMLLabelElement>) => {

        e.preventDefault();

        const arquivo = e.dataTransfer.files?.[0];

        if (arquivo) {
            processarFoto(arquivo);
        }
    };

    if (verificandoSessao || carregando) {

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

            {tipo === 'adm'
                ? <NavBarAdmin />
                : <NavBar />
            }

            <div className="perfil-area">

                <div className="perfil-container">

                    <h1>
                        Meu Perfil
                    </h1>

                    <form onSubmit={salvar}>

                        <div className="perfil-foto-area">

                            <label
                                htmlFor="foto-perfil"
                                className="perfil-foto-upload"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={soltarFoto}
                            >
                                {foto ? (
                                    <img
                                        src={foto}
                                        alt="Foto de perfil"
                                    />
                                ) : (

                                    <div className="perfil-foto-placeholder">

                                        <span>
                                            📷
                                        </span>

                                        <small>
                                            Adicionar foto
                                        </small>

                                    </div>
                                )}

                            </label>

                            <input
                                id="foto-perfil"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={selecionarFoto}
                                hidden
                            />

                            <p className="perfil-foto-texto">
                                Clique ou arraste uma imagem
                            </p>

                            {foto && (

                                <button
                                    type="button"
                                    className="btn-remover-foto-perfil"
                                    onClick={() => setFoto('')}
                                >
                                    Remover foto
                                </button>

                            )}

                        </div>

                        <div className="perfil-campo">

                            <label htmlFor="nome">
                                Nome
                            </label>

                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
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
                                onChange={(e) =>setNovaSenha(e.target.value)}
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
                                onChange={(e) =>setConfirmarSenha(e.target.value)}
                            />

                            {confirmarSenha.length > 0 &&
                                !senhasIguais && (

                                <span className="senha-erro">
                                    As senhas não coincidem.
                                </span>

                            )}

                        </div>

                        <button
                            type="submit"
                            disabled={
                                salvando ||
                                !possuiAlteracoes ||
                                !senhasIguais
                            }
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