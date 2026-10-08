'use client';

import NavbarAdmin from '@/app/components/NavBarAdmin';
import { usePatrimonioForm } from '@/app/hooks/usePatrimonioForm';
import '@/app/css/styleCadastros.css';

export default function CadastroPatrimonio() {

    const {
        nome,
        setNome,
        numeroPatrimonio,
        setNumeroPatrimonio,
        rfid,
        setRfid,
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
                        ? "Editar patrimônio"
                        : "Cadastrar patrimônio"
                    }
                </h1>
                <form onSubmit={salvar}>
                    <div className="campo">
                        <label>Nome do patrimônio</label>

                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome do patrimônio"
                        />
                    </div>

                    <div className="campo">
                        <label>Número do patrimônio</label>

                        <input
                            type="text"
                            value={numeroPatrimonio}
                            onChange={(e) => setNumeroPatrimonio(e.target.value)}
                            placeholder="Digite o número do patrimônio"
                        />
                    </div>

                    <div className="campo">
                        <label>RFID</label>

                        <input
                            type="text"
                            value={rfid}
                            onChange={(e) => setRfid(e.target.value)}
                            placeholder="Digite o código RFID"
                        />
                    </div>

                    <div className="campo">
                        <label>Status</label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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

                    <div className="campo">
                        <label>Foto</label>

                        <input
                            type="text"
                            value={foto}
                            onChange={(e) => setFoto(e.target.value)}
                            placeholder="Digite o caminho ou URL da foto"
                        />

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