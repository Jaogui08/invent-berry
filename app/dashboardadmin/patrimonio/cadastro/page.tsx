'use client';

import NavbarAdmin from '@/app/components/NavBarAdmin';
import { usePatrimonioForm } from '@/app/hooks/usePatrimonioForm';
import '@/app/css/styleCadastros.css';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

export default function CadastroPatrimonio() {

    const {
        nome,
        setNome,
        numeroPatrimonio,
        setNumeroPatrimonio,
        status,
        setStatus,
        foto,
        setFoto,
        editandoId,
        carregando,
        salvar,
        cancelar,
        salvando
    } = usePatrimonioForm();

    const [
        aguardandoTag,
        setAguardandoTag
    ] = useState(false);

    const iniciarLeituraTag = async () => {

        try {

            const resposta = await fetch(
                '/api/rfid/captura',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        acao: 'iniciar'
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error();
            }

            setAguardandoTag(true);

        } catch {

            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível iniciar a leitura RFID.',
                icon: 'error',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: '#211d1d'
            });
        }
    };

    const cancelarLeituraTag = async () => {

        await fetch(
            '/api/rfid/captura',
            {
                method: 'DELETE'
            }
        );

        setAguardandoTag(false);
    };

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
                background: '#211d1d'
            });

            return;
        }

        const tamanhoMaximo = 10 * 1024 * 1024;

        if (arquivo.size > tamanhoMaximo) {

            Swal.fire({
                title: 'Imagem muito grande!',
                text: 'A imagem deve ter no máximo 10 MB.',
                icon: 'warning',
                confirmButtonColor: '#ca0101',
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

    const selecionarFoto = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const arquivo = e.target.files?.[0];

        if (arquivo) {
            processarFoto(arquivo);
        }
    };

    const soltarFoto = (
        e: React.DragEvent<HTMLLabelElement>
    ) => {

        e.preventDefault();

        const arquivo = e.dataTransfer.files?.[0];

        if (arquivo) {
            processarFoto(arquivo);
        }
    };

    useEffect(() => {

        const verificarCaptura = async () => {

            try {

                const resposta = await fetch(
                    '/api/rfid/captura'
                );

                if (!resposta.ok) {
                    return;
                }

                const dados =
                    await resposta.json();
                    
                setAguardandoTag(
                    dados.ativo
                );

                if (
                    dados.numeroPatrimonio
                ) {

                    setNumeroPatrimonio(
                        dados.numeroPatrimonio
                    );

                    setAguardandoTag(false);

                    await fetch(
                        '/api/rfid/captura',
                        {
                            method: 'DELETE'
                        }
                    );

                    await Swal.fire({
                        title: 'Tag identificada!',
                        text: `Número: ${dados.numeroPatrimonio}`,
                        icon: 'success',
                        confirmButtonColor: '#ca0101',
                        color: '#e6e6e6',
                        background: '#211d1d'
                    });
                }

            } catch (error) {

                console.error(
                    'Erro ao verificar captura RFID:',
                    error
                );
            }
        };

        verificarCaptura();

        const intervalo = setInterval(
            verificarCaptura,
            500
        );

        return () =>
            clearInterval(intervalo);

    }, [setNumeroPatrimonio]);

    if (carregando) {
        return (
            <main className="cadastro-page">

                <NavbarAdmin />

                <section className="form-container">
                    <p>Carregando patrimônio...</p>
                </section>

            </main>
        );
    }

    return (
        <main className="cadastro-page">

            <NavbarAdmin />

            <section className="form-container">

                <h1>
                    {editandoId
                        ? 'Editar patrimônio'
                        : 'Cadastrar patrimônio'
                    }
                </h1>

                <form onSubmit={salvar}>

                    <div className="campo">

                        <label>
                            Nome do patrimônio
                        </label>

                        <input
                            type="text"
                            value={nome}
                            onChange={(e) =>
                                setNome(e.target.value)
                            }
                            placeholder="Digite o nome do patrimônio"
                        />

                    </div>

                    <div className="campo">

                        <label>
                            Número do patrimônio
                        </label>


                        <div className="campo-rfid">

                            <input
                                type="text"
                                value={numeroPatrimonio}

                                onChange={(e) =>
                                    setNumeroPatrimonio(
                                        e.target.value
                                    )
                                }

                                placeholder={
                                    aguardandoTag
                                        ? 'Aguardando tag RFID...'
                                        : 'Digite ou leia o número do patrimônio'
                                }
                            />

                            {!editandoId && (

                                aguardandoTag ? (

                                    <button
                                        type="button"
                                        className="btn-cancelar-rfid"
                                        onClick={
                                            cancelarLeituraTag
                                        }
                                    >
                                        Cancelar leitura
                                    </button>

                                ) : (

                                    <button
                                        type="button"
                                        className="btn-ler-rfid"
                                        onClick={
                                            iniciarLeituraTag
                                        }
                                    >
                                        Ler tag RFID
                                    </button>
                                )
                            )}
                        </div>

                        {aguardandoTag && (
                            <small className="aguardando-rfid">
                                Aproxime uma tag do leitor...
                            </small>
                        )}

                    </div>

                    {editandoId && (

                        <div className="campo">

                            <label>Status</label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >

                                <option value="" disabled>
                                    Selecione o status
                                </option>

                                <option value="ATIVO">
                                    Ativo
                                </option>

                                <option value="INATIVO">
                                    Inativo
                                </option>

                                <option value="MANUTENÇÃO">
                                    Em manutenção
                                </option>

                                <option value="DESCARTADO">
                                    Descartado
                                </option>

                            </select>

                        </div>

                    )}

                    <div className="campo">

                        <label>
                            Foto do patrimônio
                        </label>

                        <label
                            htmlFor="foto-upload"
                            className="foto-upload"
                            onDragOver={(e) =>
                                e.preventDefault()
                            }
                            onDrop={soltarFoto}
                        >

                            {foto ? (
                                <div className="foto-preview">

                                    <img
                                        src={foto}
                                        alt="Prévia do patrimônio"
                                    />

                                    <p>
                                        Clique ou arraste outra imagem
                                        para substituir
                                    </p>

                                </div>
                            ) : (
                                <div className="foto-placeholder">

                                    <span>📷</span>

                                    <strong>
                                        Clique para selecionar uma imagem
                                    </strong>

                                    <p>
                                        ou arraste o arquivo até aqui
                                    </p>

                                    <small>
                                        JPG, PNG ou WEBP — máximo 10 MB
                                    </small>

                                </div>
                            )}
                        </label>

                        <input
                            id="foto-upload"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={selecionarFoto}
                            hidden
                        />

                        {foto && (
                            <button
                                type="button"
                                className="btn-remover-foto"
                                onClick={() => setFoto('')}
                            >
                                Remover foto
                            </button>
                        )}
                    </div>

                    <div className="botoes">

                        <button
                            type="button"
                            onClick={cancelar}
                            className="btn-cancelar"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn-salvar"
                            disabled={salvando}
                        >
                            {salvando
                                ? 'Salvando...'
                                : editandoId
                                    ? 'Atualizar'
                                    : 'Cadastrar'
                            }
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}