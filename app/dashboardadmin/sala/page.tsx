'use client';

import NavbarAdmin from '@/app/components/NavBarAdmin';
import { useSalas } from '@/app/hooks/useSalas';
import '@/app/css/styleSalas.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SalasAdmin() {

    const router = useRouter();

    const {
        salas,
        carregando,
        editar,
        excluir
    } = useSalas();


    const [pagina, setPagina] =
        useState(1);

    const itensPorPagina = 10;

    const totalPaginas =
        Math.ceil(
            salas.length /
            itensPorPagina
        );

    const inicio =
        (pagina - 1) *
        itensPorPagina;

    const salasPagina =
        salas.slice(
            inicio,
            inicio + itensPorPagina
        );

    if (carregando) {

        return (

            <main className="salas-page">

                <NavbarAdmin />

                <div className="carregando-salas">
                    Carregando salas...
                </div>

            </main>
        );
    }

    return (

        <main className="salas-page">

            <NavbarAdmin />

            <section className="salas-container">

                <div className="titulo-salas">

                    <h1>Salas</h1>

                    <button
                        onClick={() =>
                            router.push(
                                '/dashboardadmin/sala/cadastro'
                            )
                        }
                        className="btn-cadastrar-sala"
                    >
                        Cadastrar sala
                    </button>

                </div>

                {salas.length === 0 ? (

                    <p className="sem-salas">
                        Nenhuma sala cadastrada.
                    </p>

                ) : (

                    <>

                        <div className="tabela-salas">

                            <div className="cabecalho-salas">

                                <div>
                                    Nome
                                </div>

                                <div>
                                    ID do leitor
                                </div>

                                <div style={{display: "flex", justifyContent: "center", marginRight: 25}}>
                                    Ações
                                </div>

                            </div>

                            {salasPagina.map(
                                (sala) => (

                                    <div
                                        className="linha-sala"
                                        key={sala.id}
                                    >

                                        <div>
                                            {sala.nome}
                                        </div>

                                        <div>

                                            {sala.leitorId ? (

                                                <span className="leitor-id">
                                                    {sala.leitorId}
                                                </span>

                                            ) : (

                                                <span className="sem-leitor">
                                                    Sem leitor associado
                                                </span>

                                            )}

                                        </div>

                                        <div className="acoes-sala">

                                            <button
                                                className="btn-editar"
                                                onClick={() =>
                                                    editar(
                                                        sala.id!
                                                    )
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn-excluir"
                                                onClick={() =>
                                                    excluir(
                                                        sala.id!
                                                    )
                                                }
                                            >
                                                Excluir
                                            </button>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>

                        {totalPaginas > 1 && (

                            <div className="paginacao">

                                <button
                                    onClick={() =>
                                        setPagina(
                                            pagina - 1
                                        )
                                    }
                                    disabled={
                                        pagina === 1
                                    }
                                >
                                    Anterior
                                </button>

                                <span>
                                    Página {pagina}
                                    {' '}de{' '}
                                    {totalPaginas}
                                </span>

                                <button
                                    onClick={() =>
                                        setPagina(
                                            pagina + 1
                                        )
                                    }
                                    disabled={
                                        pagina ===
                                        totalPaginas
                                    }
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