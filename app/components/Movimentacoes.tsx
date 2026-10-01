'use client';

import { useState } from 'react';
import { useMovimentacoes } from '@/app/hooks/useMovimentacoes';
import '../css/styleDashboard.css'

export default function Movimentacoes() {
    const { movimentacoes, carregando } = useMovimentacoes();
    const [pagina, setPagina] = useState(1);
    const itensPorPagina = 5;

    const totalPaginas = Math.ceil(
        movimentacoes.length / itensPorPagina
    );

    const inicio = (pagina - 1) * itensPorPagina;
    const movimentacoesPagina = movimentacoes.slice(
        inicio,
        inicio + itensPorPagina
    );

    const formatarData = (data: string) => {
        const dataFormatada = new Date(data);
        return dataFormatada.toLocaleDateString('pt-BR');
    };

    const formatarHora = (data: string) => {
        const dataFormatada = new Date(data);
        return dataFormatada.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (carregando) {
        return (
            <section className="movimentacoes">
                <h1>Histórico de movimentações</h1>

                <p className="carregando">
                    Carregando movimentações...
                </p>
            </section>
        );
    }

    return (
        <section className="movimentacoes">
            <h1>Histórico de movimentações</h1>
            <div className="tabela-movimentacoes">
                <div className="cabecalho-movimentacoes">
                    <div>Imagem</div>
                    <div>Nome</div>
                    <div>Status</div>
                    <div>Sala</div>
                    <div>Movimentação</div>
                    <div>Data/hora</div>
                </div>

                {movimentacoesPagina.map((movimentacao) => (

                    <div
                        className="linha-movimentacao"
                        key={movimentacao.id}
                    >

                        <div className="imagem-patrimonio">
                            {movimentacao.patrimonio?.foto ? (
                                <img src={movimentacao.patrimonio.foto}/>
                            ) : (
                                <span>Sem imagem</span>
                            )}
                        </div>

                        <div>
                            {movimentacao.patrimonio?.nome}
                        </div>

                        <div>
                            {movimentacao.patrimonio?.status}
                        </div>

                        <div>
                            {movimentacao.sala?.nome}
                        </div>

                        <div
                            className={
                                movimentacao.tipo === 'ENTRADA'
                                    ? 'entrada'
                                    : 'saida'
                            }
                        >
                            {movimentacao.tipo}
                        </div>

                        <div className="data-hora">

                            <span>
                                {formatarData(movimentacao.dataHora)}
                            </span>

                            <span>
                                {formatarHora(movimentacao.dataHora)}
                            </span>

                        </div>

                    </div>

                ))}

            </div>

            {movimentacoes.length === 0 && (
                <p className="sem-movimentacoes">
                    Nenhuma movimentação registrada.
                </p>
            )}

            {totalPaginas > 1 && (

                <div className="paginacao">

                    <button
                        onClick={() => setPagina(pagina - 1)}
                        disabled={pagina === 1}
                    >
                        Anterior
                    </button>

                    <span>
                        Página {pagina} de {totalPaginas}
                    </span>

                    <button
                        onClick={() => setPagina(pagina + 1)}
                        disabled={pagina === totalPaginas}
                    >
                        Próxima
                    </button>

                </div>

            )}

        </section>
    );
}