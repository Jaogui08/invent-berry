'use client';

import NavbarAdmin from '@/app/components/NavBarAdmin';
import { usePatrimonios } from '@/app/hooks/usePatrimonios';
import '@/app/css/stylePatrimonios.css';
import { useState } from 'react';

export default function PatrimoniosAdmin() {
    const {
        patrimonios,
        carregando,
        editar,
        excluir
    } = usePatrimonios();

    const [pagina, setPagina] = useState(1);
    const itensPorPagina = 10;
    const totalPaginas = Math.ceil(
        patrimonios.length / itensPorPagina
    );
    const inicio = (pagina - 1) * itensPorPagina;
    const patrimoniosPagina = patrimonios.slice(
        inicio,
        inicio + itensPorPagina
    );

    if (carregando) {
        return (
            <main className="patrimonios-page">

                <NavbarAdmin />

                <div className="carregando">
                    Carregando patrimônios...
                </div>

            </main>
        );

    }

    return (
        <main className="patrimonios-page">

            <NavbarAdmin />

            <section className="patrimonios-container">

                <div className="titulo-patrimonios">
                    <h1>Patrimônios</h1>
                </div>

                {patrimonios.length === 0 ? (

                    <p className="sem-patrimonios">
                        Nenhum patrimônio cadastrado.
                    </p>

                ) : (

                    <>
                        <div className="tabela-patrimonios">

                            <div className="cabecalho-patrimonios">

                                <div>Imagem</div>
                                <div>Nome</div>
                                <div>Nº Patrimônio</div>
                                <div>RFID</div>
                                <div>Status</div>
                                <div>Ações</div>

                            </div>

                            {patrimoniosPagina.map((patrimonio) => (

                                <div
                                    className="linha-patrimonio"
                                    key={patrimonio.id}
                                >

                                    <div className="imagem-patrimonio">

                                        {patrimonio.foto ? (

                                            <img
                                                src={patrimonio.foto}
                                                alt={patrimonio.nome}
                                            />

                                        ) : (
                                            <span>
                                                Sem imagem
                                            </span>
                                        )}

                                    </div>

                                    <div>
                                        {patrimonio.nome}
                                    </div>

                                    <div>
                                        {patrimonio.numeroPatrimonio}
                                    </div>

                                    <div>
                                        {patrimonio.rfid || 'Sem RFID'}
                                    </div>

                                    <div>

                                        <span
                                            className={`status ${patrimonio.status
                                                .toLowerCase()
                                                .replace('ç', 'c')
                                                .replace('ã', 'a')
                                                .replace(' ', '-')
                                            }`}
                                        >
                                            {patrimonio.status}
                                        </span>

                                    </div>

                                    <div className="acoes-patrimonio">

                                        <button
                                            className="btn-editar"
                                            onClick={() =>
                                                editar(patrimonio.id)
                                            }
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn-excluir"
                                            onClick={() =>
                                                excluir(patrimonio.id)
                                            }
                                        >
                                            Excluir
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                        {totalPaginas > 1 && (

                            <div className="paginacao">

                                <button
                                    onClick={() =>
                                        setPagina(pagina - 1)
                                    }
                                    disabled={pagina === 1}
                                >
                                    Anterior
                                </button>

                                <span>
                                    Página {pagina} de {totalPaginas}
                                </span>

                                <button
                                    onClick={() =>
                                        setPagina(pagina + 1)
                                    }
                                    disabled={pagina === totalPaginas}
                                >
                                    Próxima
                                </button>

                            </div>

                        )}

                    </>
                )}
            </section>
        </main>
    );
}