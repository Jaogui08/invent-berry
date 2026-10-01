'use client';

import NavbarAdmin from '@/app/components/NavBarAdmin';
import { useMovimentacaoForm } from '@/app/hooks/useMovimentacoesForm';
import '@/app/css/styleCadastros.css';

export default function CadastroMovimentacao() {
    const {
        patrimonioId,
        setPatrimonioId,
        salaId,
        setSalaId,
        tipo,
        setTipo,
        patrimonios,
        salas,
        salvar,
        cancelar,
        salvando
    } = useMovimentacaoForm();

    return (
        <main className="cadastro-page">

            <NavbarAdmin />

            <section className="form-container">
                <h1>Cadastrar Movimentação</h1>
                <form onSubmit={salvar}>
                    <div className="campo">

                        <label>Patrimônio</label>

                        <select
                            value={patrimonioId}
                            onChange={(e) => setPatrimonioId(e.target.value)}
                            disabled={patrimonios.length === 0}
                        >

                            {patrimonios.length === 0 ? (

                                <option value="" disabled>
                                    Nenhum patrimônio encontrado
                                </option>

                            ) : (

                                <>

                                    <option value="" disabled>
                                        Selecione um patrimônio
                                    </option>

                                    {patrimonios.map((patrimonio) => (

                                        <option
                                            key={patrimonio.id}
                                            value={patrimonio.id}
                                        >
                                            {patrimonio.nome}
                                        </option>

                                    ))}

                                </>

                            )}

                        </select>

                    </div>

                    <div className="campo">

                        <label>Sala</label>

                        <select
                            value={salaId}
                            onChange={(e) => setSalaId(e.target.value)}
                            disabled={salas.length === 0}
                        >

                            {salas.length === 0 ? (

                                <option value="" disabled>
                                    Nenhuma sala encontrada
                                </option>

                            ) : (

                                <>

                                    <option value="" disabled>
                                        Selecione uma sala
                                    </option>

                                    {salas.map((sala) => (

                                        <option
                                            key={sala.id}
                                            value={sala.id}
                                        >
                                            {sala.nome}
                                        </option>

                                    ))}

                                </>

                            )}

                        </select>

                    </div>

                    <div className="campo">

                        <label>Tipo de movimentação</label>

                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >

                            <option value="" disabled>
                                Selecione o tipo
                            </option>

                            <option value="ENTRADA">
                                Entrada
                            </option>

                            <option value="SAÍDA">
                                Saída
                            </option>

                        </select>

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
                                : 'Salvar'
                            }
                        </button>

                    </div>
                </form>
            </section>
        </main>
    );
}